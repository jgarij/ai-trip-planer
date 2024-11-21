import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input';
import { ai_prompt } from '@/components/constants/options';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { budgetList, selectTravelList } from '@/components/constants/options';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { chatSession } from '@/services/AI_MODAL';



export default function CreateTrip() {
  const navigate = useNavigate();
  const placeapi = import.meta.env.VITE_GOOGLE_PLACE_API;
  const [curruser, setcurrUser] = useState(localStorage.getItem('curruser')||"");
  const [showlogin, setShowLogin] = useState(false)
  const [formData, setformData] = useState({});
  const [ profile, setProfile ] = useState([]);
  const[loading,setloading]=useState(false);
  const { toast } = useToast()
  function handleChange(key, value) {
    setformData((prev) => ({
      ...prev,
      [key]: value
    }))
  }

useEffect(()=>{
  console.log("user",curruser);
},[curruser])
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
      console.log("Google Response:", codeResponse);
      console.log("coderesponse",codeResponse)
      getUserProfile(codeResponse);
 
    },
    onError: (error) => console.log('Login Failed:', error),
  });
const getUserProfile=function(TokenInfo){


            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${TokenInfo.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${TokenInfo.access_token}`,
                        Accept: 'application/json'
                    },
                })
                .then((res) => {
                
               
                    localStorage.setItem("curruser",JSON.stringify(res.data));
                   setcurrUser(res.data);
                    setShowLogin(false);
                    return ;
                })
                .catch((err) => console.log(err));
        }
    
  
  async function handleSubmit(e) {
    e.preventDefault();
   
    if (formData.days > 5 || !formData.days || !formData.location || !formData.traveller || !formData.budget) {
      toast({

        description: "Please fill details correctly",
      })
      return false;
    }
    setloading(true);
    if (!curruser) {
      console.log("User nii h");
      setShowLogin(true);
      return;
    }

    console.log("form submitted succesfully!")

  // Final Prompt
  const final_prompt = ai_prompt.replace('{location}', formData.location ? formData.location.label : "")

    .replace("{days}", formData.days ? formData.days : 0)
    .replace("{traveller}", formData.traveller ? formData.traveller : "")
    .replace("{budget}", formData.budget ? formData.budget : "")
    .replace("{days}", formData.days ? formData.days : 0)
    console.log(final_prompt);
   
    const result = await chatSession.sendMessage(final_prompt);
    console.log(result?result.response.text():"");
    console.log("chastSession",chatSession)
    saveData(result?.response.text());
  }
// Save data to firebase

const saveData=async(TripData) =>{
  const docId = Date.now().toString();
  const user =JSON.parse(localStorage.getItem('curruser'));
  console.log("curruser email",curruser);
  try {
      await setDoc(doc(db, "AI_Trips", docId), {
          tripData:JSON.parse(TripData),
          userSelection: formData,
          userdata:user.email,
          docId:docId,

      });
   
      console.log('Data saved successfully!');
      setloading(false);
      navigate(`/trip-details/${docId}`)

  } catch (error) {
      console.error('Error saving data:', error);
  }
}




  return (
    <>
      {showlogin && (
        <Dialog open={showlogin} onOpenChange={setShowLogin}>

          <DialogContent>

            <DialogTitle>Sign with Google</DialogTitle>
            <DialogDescription>
            <button onClick={() => login()}>Sign in with Google 🚀 </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
     )} 
      <form onSubmit={handleSubmit} className='flex flex-col text-left p-5'>
        <h2 className='mt-3 font-bold text-[23px] '>Tell us about your travel preferences 🎋🏕️</h2>
        <p className='text-gray-500'>Just provide some basic information, and our trip planner will generate a customized itinerrary based on your preference</p>

        {/* Basic Form */}
        <div>
          <div>
            <h2 className='font-bold mt-6 text-lg'>What is destination of choice?</h2>
            <GooglePlacesAutocomplete
              apiKey={placeapi}
              selectProps={{
                onChange: (place) => handleChange('location', place),
                placeholder: "Enter a Location"
              }}
            />

          </div>


          <div>
            <h2 className='font-bold text-lg mt-4'>How may days are you planning your trip?</h2>
            <Input placeholder="Ex-3 but less than 6"
              onChange={(e) => handleChange('days', (e.target.value))}
              type="number" />
          </div>
          <div className='flex flex-col justify-between  md-flex-row '>

          </div>
          <h2 className='font-bold text-lg mt-5 mb-5'>Who is going on trip?</h2>
          <div className="flex  justify-around flex-wrap gap-4">
            {selectTravelList.map((m, index) => (
              <div key={index} onClick={() => (handleChange("traveller", m.title))} className={`text-center p-9 rounded-lg shadow-md border-red-800 ${formData.traveller === m.title ? "border-black" : ""}`}>
                <p className="font-semibold">{m.title}</p>
                <p className="text-gray-600">{m.desc}</p>
                <p className='text-3xl'>{m.icon}</p>
              </div>
            ))}
          </div>
          <h2 className='font-bold text-lg mt-5 '>What is  Your budget?</h2>
          <p className='mb-4 font-bold'>The budget is exclusively for activities and doing progress</p>
          <div className="flex flex-wrap justify-around   gap-4" >
            {budgetList.map((m, index) => (
              <div key={index} className={`text-center  p-9 rounded-lg shadow-sm ${formData.budget === m.title ? "border-black" : ""}`} onClick={() => (handleChange("budget", m.title))}>
                <p className="font-semibold">{m.title}</p>
                <p className="text-gray-600">{m.desc}</p>
                <p className='text-3xl'>{m.icon}</p>
              </div>
            ))}
          </div>

        </div>
        <div className='flex justify-end' ><Button className="mt-5 ">{loading?<AiOutlineLoading3Quarters className='animate-spin' />
        :"Generate Trip"}</Button></div>
      </form>
    </>
  )

}