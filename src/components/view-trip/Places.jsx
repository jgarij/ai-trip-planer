import React from 'react'
import TripDetails from './TripDetails';
import kasis1 from "./kasis1.jpg"
import { Link } from 'react-router-dom';
import PlacesCard from './PlacesCard';
function Places({itinerary}) {
    console.log("itinerary",itinerary);
    let day = 1;
  return (
    <div>
      <h2 className='font-bold mt-8 text-2xl'>Places to Visit</h2>
      {Object.values(itinerary).map((m,index)=>(
      <div key={index} className="">
        <h2 className='font-bold mt-9 text-[22px]'>Day {day++}</h2>
       <h2 className='font-bold text-[17px]'> Best time to visit {m.bestTimeToVisit}</h2>
       <div className='flex gap-24 shadow-sm  flex-wrap'>
       { m.places.map((place,index)=>(
      <PlacesCard place={place} index={index}/>
        ))}
        </div>
        </div>
    ))}
    </div>
  )
}

export default Places


