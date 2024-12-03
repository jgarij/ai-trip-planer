import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { db } from "@/services/firebaseConfig";
import { useState } from "react";
import { getDoc,doc } from "firebase/firestore";
import kasis from "../../assets/kasis.jpg"
import {Button} from "../ui/button";
import Hotels from "./Hotels";
import Places from "./Places";
import { Link } from "react-router-dom";
import  GetPlaceDetails from "@/services/GooglePlace"
export default  function TripDetails(){
    const {tripId} = useParams();
    const [tripDetails,setTripDetails]=useState(null);
    console.log("gairma tripId",tripId)
    const [error, setError] = useState(null);
    const[Photourl,setPhotourl] = useState("")
    
    useEffect(()=>{
          const fetchDocumentById = async()=>{
         
            try{
                const docRef = doc(db,'AI_Trips',tripId);
              
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                  
                    setTripDetails(docSnap.data());
                    // console.log(docSnap.data())
                    
                }
                else{
                    throw new Error('No document found');
                }
    
            }catch(e){
                setError(e);
                console.log("No document found!!!",e)
            }
        }
        if(tripId) fetchDocumentById()
        },[tripId]);
    if(error){

        return <div>{error}</div>
    }

   
    const GeneratePhoto = async () => {
        const data = {
          textQuery: tripDetails?.userSelection?.location?.label,  // The location query
        }
        try {
            const result = await GetPlaceDetails(data).then(resp=>{
            let pic_id = resp.data.places[0].photos[5].name;
            const picurl = `https://places.googleapis.com/v1/${pic_id}/media?key=${ import.meta.env.VITE_GOOGLE_PLACE_API}&maxWidthPx=3000&maxHeightPx=4000`
            setPhotourl(picurl)
          })
        } 
        catch (error) {
          console.error("Error fetching places:", error);
        }
      };
      
    useEffect(()=>{
        tripDetails&&GeneratePhoto();

    },[tripDetails]);
   
        return (
            <div>
                {tripDetails ? (
                    <div>
                       <Link to={`https://www.google.com/maps/search/?api=1&query=${tripDetails.userSelection.location.label}`}><div className="bg-gray-300 h-[400px]  mt-5 "><img src={Photourl||kasis} className="border-box object-cover h-full w-full" alt="" /></div></Link> 
                        <h3 className="font-bold text-2xl mt-6">{tripDetails.userSelection.location.label}</h3>
                         <div className="flex gap-9 mt-3">
                         <p className=" bg-gray-200 rounded-full text-gray-500 px-2">{tripDetails.userSelection.budget} Budget </p>
                         <p className="bg-gray-200 rounded-full text-gray-500 px-2" >{tripDetails.userSelection.days} days</p>
                         <p className="bg-gray-200 rounded-full text-gray-500 px-2" >{tripDetails.userSelection.traveller}</p>
                         </div>
                      
 
                        <Hotels hotelInfo={tripDetails.tripData.hotels} tripDetails={tripDetails}/>

                        <Places itinerary={tripDetails.tripData.itinerary}></Places>
                    </div>
                ) : (
                    <p>Loading...</p> // Show loading if tripData is not yet available
                )}
            </div>
        );

   
}
// 1732093117622