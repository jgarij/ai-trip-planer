import React from 'react'
import kasis from "../../assets/kasis.jpg"
import { Link } from 'react-router-dom'
import Hotelcard from './Hotelcard';
function Hotels({hotelInfo,tripDetails}) {

  return (
    <>
    <h2 className='font-bold tex--xl mt-4 mb-5 text-2xl'>Hotel Recommendation</h2>
    <div className='flex gap-4  flex-wrap'>
     { 
     hotelInfo.map((m,index)=>(
         <Hotelcard m={m} index={index}> </Hotelcard>
       
     ))
}
</div>
</>
  )
}

export default Hotels
