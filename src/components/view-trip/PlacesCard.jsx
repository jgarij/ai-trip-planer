import kasis1 from "./kasis1.jpg"
import React from "react"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react";
import GetPlaceDetails from "@/services/GooglePlace";
export default function PlacesCard({place,index}) {
    const [placeurl,setPhotourl]=useState('')
    const GeneratePhoto = async () => {
        const data = {
          textQuery: place?.placeName,  // The location query
        }
        console.log("data bataooo",data);
        try {
            const result = await GetPlaceDetails(data).then(resp=>{
            let pic_id = resp.data.places[0].photos[0].name;
            const picurl = `https://places.googleapis.com/v1/${pic_id}/media?key=${ import.meta.env.VITE_GOOGLE_PLACE_API}&maxWidthPx=300&maxHeightPx=400`
            console.log("pic",picurl)
            setPhotourl(picurl)
          })
        } 
        catch (error) {
          console.error("Error fetching places:", error);
        }
      };
    
      useEffect(()=>{
    GeneratePhoto()
      },[place.placeName])
    return (
    <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`} target="_blank">
      <div key={index} className=' mt-6 p-1 shadow-md flex sm:flex-row flex-col leading-[30px] sm:gap-7 transition-transform duration-300 hover:scale-110' >
       <img className='h-[300px] w-[350px]  rounded-md' src={placeurl} alt="" />
     <div className=' flex  flex-col justify-center px-1'>
      <p className='font-bold text-[20px] '>{place.placeName}</p>
       <p className='text-gray-600'>{place.placeDetails}</p>
       <p>🎫 Ticket {place.ticketPrice}</p>
       <p className='text-red-700'>⏱️ {place.timings}</p>
       </div>  
       </div>
       </Link>
  )
}
