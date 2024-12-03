import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import kasis from "../../assets/kasis.jpg"
import GetPlaceDetails from '@/services/GooglePlace'
export default function Hotelcard({m,index}) {
    const[Photourl,setPhotourl]=useState("")
    console.log("hotelsinfo",m.hotelName)
    const GeneratePhoto = async () => {
        const data = {
          textQuery: m?.hotelName,  // The location query
        }
        console.log("data bataooo",data);
        try {
            const result = await GetPlaceDetails(data).then(resp=>{
            let pic_id = resp.data.places[0].photos[1].name;
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
      },[m.hotelName])
  return (
    <div>
      <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=${m.hotelName+" "+m.address}`} target="_blank">
        <div className="shadow-md w-[350px] h-[450px] leading-[30px]" key={index}>
        <img
  className={`h-[250px] w-[350px] transition-transform duration-300 ease-in-out transform hover:scale-110 ${Photourl === "" ? "bg-gray-300" : ""}`}
  src={Photourl ||kasis} // Fallback to a default image if Photourl is empty
  alt="Image"
/>
        {/* <img  className="h-[250px] w-[350px] transition-transform duration-300 ease-in-out transform hover:scale-110" src={Photourl} alt="" /> */}
         <p className='font-bold mt-2 text-[20px]'>{m.hotelName}</p>
         <p className='font-light '> 📍{m.address}</p>
         <p> 💰{m.price} per night</p>
         <p> ⭐{m.rating} stars</p>
         </div>
         </Link>



    </div>
  )
}
