import React from 'react'
import TripDetails from './TripDetails';
import kasis1 from "./kasis1.jpg"
import { Link } from 'react-router-dom';
function Places({itinerary}) {
    console.log(itinerary);
    let day = 1;
  return (
    <div>
      <h2 className='font-bold mt-8 text-2xl'>Places to Visit</h2>
      {Object.values(itinerary).map((m,index)=>(
      <div key={index} className="">
        <h2 className='font-bold mt-9 text-[22px]'>Day {day++}  </h2>
       <h2 className='font-bold text-[17px]'> Best time to visit  {m.bestTimeToVisit}</h2>
       <div className='flex gap-24 shadow-sm  flex-wrap'>
       { m.places.map((place,index)=>(
     <Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`} target="_blank">
      <div key={index} className=' mt-6 p-1 shadow-md flex sm:flex-row flex-col leading-[30px] sm:gap-7 transition-transform duration-300 hover:scale-110' >
       <img className='h-[300px] w-[350px]  rounded-md' src={kasis1} alt="" />
     <div className=' flex  flex-col justify-center px-1'>
      <p className='font-bold text-[20px] '>{place.placeName}</p>
       <p className='text-gray-600'>{place.placeDetails}</p>
       <p>🎫 Ticket {place.ticketPrice}</p>
       <p className='text-red-700'>⏱️ {place.timings}</p>
       </div>  
       </div>
       </Link>
        ))}
        </div>
        </div>
    ))}
     
    </div>
  )
}

export default Places


