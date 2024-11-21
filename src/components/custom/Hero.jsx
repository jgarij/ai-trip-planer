import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className=' mx-auto mt-12'>
    <div className='flex text-center flex-col justify-center'>
     <h1 className='font-bold mx-4 mt-5 text-[33px]  '><span className='text-red-700'>Discover your next adventure trip with AI</span>:Personalised Itinearies at your Fingertips</h1>
    <p className='text-gray-400 font-bold mt-4'>Your personal trip planner and travel curator,creating custom inieraies tailored to your interests and budget </p>
    <div className='mt-4 mb-5'> <Link to="/create-trip"><Button  className="p-6 text-[19px]"> Get Started </Button> </Link></div>
     </div>
  
    </div>
  )
}

export default Hero
