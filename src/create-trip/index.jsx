import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ai_prompt } from "@/components/constants/options";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { budgetList, selectTravelList } from "@/components/constants/options";
import axios from "axios";
import { useUser } from "@/Context/UserContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { chatSession } from "@/services/AI_MODAL";

export default function CreateTrip() {
  const navigate = useNavigate();
  const placeapi = import.meta.env.VITE_GOOGLE_PLACE_API;
  const {currUser, setCurrUser} = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Handle input changes
  function handleChange(key, value) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  useEffect(() => {
    console.log("user", currUser?.picture);
  }, [currUser]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Google Response:", codeResponse);
      getUserProfile(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const getUserProfile = (TokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${TokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${TokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("curruser", JSON.stringify(res.data));
        setCurrUser(res.data);
        setShowLogin(false);
      })
      .catch((err) => console.log(err));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.days > 5 || !formData.days || !formData.location || !formData.traveller || !formData.budget) {
      toast({
        description: "Please fill details correctly",
      });
      return false;
    }

    setLoading(true);
    if (!currUser) {
      setShowLogin(true);
      setLoading(false);
      return;
    }

    const finalPrompt = ai_prompt
      .replace("{location}", formData.location ? formData.location.label : "")
      .replace("{days}", formData.days ? formData.days : 0)
      .replace("{traveller}", formData.traveller ? formData.traveller : "")
      .replace("{budget}", formData.budget ? formData.budget : "");

    console.log(finalPrompt);

    try {
      const result = await chatSession.sendMessage(finalPrompt);
      console.log(result?.response.text());
      saveData(result?.response.text());
    } catch (error) {
      toast({
        description: "Failed to generate trip. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  const saveData = async (TripData) => {
    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("curruser"));
    
    console.log("TripData:", TripData); // Log the TripData to check its structure
    
    let parsedTripData;
  
    // If TripData is a string, try to parse it as JSON. Otherwise, use it as it is.
    try {
      // Check if TripData is a string and needs parsing
      if (typeof TripData === "string") {
        parsedTripData = JSON.parse(TripData); // Try parsing the string
      } else {
        parsedTripData = TripData; // Use as is if already an object
      }
    } catch (error) {
      console.error("Error parsing TripData:", error);
      toast({ description: "Failed to generate trip data. Please try again." });
      setLoading(false);
      return;
    }
  
    try {
      await setDoc(doc(db, "AI_Trips", docId), {
        tripData: parsedTripData,
        userSelection: formData,
        userdata: user.email,
        docId: docId,
      });
  
      console.log("Data saved successfully!");
      setLoading(false);
      navigate(`/trip-details/${docId}`);
    } catch (error) {
      console.error("Error saving data:", error);
      setLoading(false);
    }
  };
  

  return (
    <>
      {showLogin && (
        <Dialog open={showLogin} onOpenChange={setShowLogin}>
          <DialogContent>
            <DialogTitle>Sign in with Google</DialogTitle>
            <DialogDescription>
              <button onClick={() => login()}>Sign in with Google 🚀</button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col text-left px-7 ">
        <h2 className="mt-3 font-bold text-[23px]">Tell us about your travel preferences 🎋🏕️</h2>
        <p className="text-gray-500">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preference</p>

        <div>
          <div>
            <h2 className="font-bold mt-6 text-lg">What is the destination of choice?</h2>
            <GooglePlacesAutocomplete
              apiKey={placeapi}
              selectProps={{
                onChange: (place) => handleChange("location", place),
                placeholder: "Enter a Location",
              }}
            />
          </div>

          <div>
            <h2 className="font-bold text-lg mt-4">How many days are you planning your trip?</h2>
            <Input
              placeholder="Ex-3 but less than 6"
              onChange={(e) => handleChange("days", e.target.value)}
              type="number"
            />
          </div>

          <h2 className="font-bold text-lg mt-5 mb-5">Who is going on the trip?</h2>
          <div className="flex justify-around flex-wrap gap-4">
            {selectTravelList.map((m, index) => (
              <div
                key={index}
                onClick={() => handleChange("traveller", m.title)}
                className={`text-center p-9 rounded-lg shadow-md border-2 ${formData.traveller === m.title ? "border-black" : ""}`}
              >
                <p className="font-semibold">{m.title}</p>
                <p className="text-gray-600">{m.desc}</p>
                <p className="text-3xl">{m.icon}</p>
              </div>
            ))}
          </div>
          <h2 className="font-bold text-lg mt-5">What is your budget?</h2>
          <p className="mb-4 font-bold">The budget is exclusively for activities and doing progress</p>
          <div className="flex flex-wrap justify-around gap-4">
            {budgetList.map((m, index) => (
              <div
                key={index}
                className={`text-center p-9 rounded-lg shadow-sm border-2 ${formData.budget === m.title ? "border-black" : ""}`}
                onClick={() => handleChange("budget", m.title)}
              >
                <p className="font-semibold">{m.title}</p>
                <p className="text-gray-600">{m.desc}</p>
                <p className="text-3xl">{m.icon}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="mt-5">
            {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Generate Trip"}
          </Button>
        </div>
      </form>
    </>
  );
}
