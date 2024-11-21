import React from 'react'
import kasis from "../../assets/kasis.jpg"
import { Link } from 'react-router-dom'
function Hotels({hotelInfo,tripDetails}) {
    const itinerary = tripDetails.tripData.itinerary;
    const loc = tripDetails.userSelection.location.label;
    console.log(itinerary)
  return (
    <>
    <h2 className='font-bold tex--xl mt-4 mb-5 text-2xl'>Hotel Recommendation</h2>
    <div className='flex gap-4  flex-wrap'>
     { 
     hotelInfo.map((m,index)=>(
      
        <Link to={`https://www.google.com/maps/search/?api=1&query=${m.address}`} target="_blank">
        <div className="shadow-md w-[350px] h-[450px] leading-[30px]" key={index}>
        <img  className="h-[250px] w-[350px] transition-transform duration-300 ease-in-out transform hover:scale-110" src={kasis} alt="" />
         <p className='font-bold mt-2 text-[20px]'>{m.hotelName}</p>
         <p className='font-light '> 📍{m.address}</p>
         <p> 💰{m.price} per night</p>
         <p> ⭐{m.rating} stars </p>
         </div>
         </Link>
     ))
}
</div>
</>
  )
}

export default Hotels
