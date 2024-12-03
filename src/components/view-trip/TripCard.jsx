import React ,{useEffect,useState}from 'react'
import GetPlaceDetails from '@/services/GooglePlace'
import { Link } from 'react-router-dom';
import kasis1 from "./kasis1.jpg"

function TripCard({m,index}) {
    const [Photourl,setPhotourl]=useState("")
    const GeneratePhoto = async () => {
        const data = {
          textQuery: m?.userSelection?.location?.label,  // The location query
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
        m&&GeneratePhoto();
    
    },[m]);
    
  return (
    <div>
      <Link to={`/trip-details/${m.docId}`}>
            <div key={index} className='shadow-sm p-1'>
            <img
  className={`h-[250px] w-[350px] transition-transform duration-300 ease-in-out transform hover:scale-110 ${Photourl === "" ? "bg-gray-300" : ""}`}
  src={Photourl ||kasis1} // Fallback to a default image if Photourl is empty
  alt="Image"
/>
              {/* <img src={Photourl} alt="Trip" className="w-[250px] h-[200px] object-cover  transition-transform duration-300 ease-in-out transform hover:scale-110" /> */}
              <p>{m?.userSelection?.location?.label || "No location label"}</p>
              <p className='text-[12px] text-gray-500'>{m.userSelection.days} days for {m.userSelection.traveller} with {m.userSelection.budget} budget</p>
            </div>
            </Link>
    </div>
  )
}

export default TripCard
