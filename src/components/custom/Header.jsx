import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast";

function Header() {
  const {toast}= useToast()
  const curruser  = JSON.parse(localStorage.getItem("curruser"));
 console.log("curruser.picture",curruser.picture)
 function handleLogout(){
toast("Logout")
 }
 return (

    <div className='bg-slate-500 flex justify-between p-2'>
   <div className='text-xl font-bold'>
   Plany..
    </div>
 { curruser?
  <div className='flex gap-5'>
    
    <Button>My Trips</Button>
    <img src={curruser.picture} alt="" />
    <img  className="rounded-full h-10-w-10" src={curruser.picture} alt="" 
     onClick={handleLogout}
     />
  </div>
 
  :
   <div><Button>Sign in</Button></div>
   }  </div>

  )
}

export default Header

