import axios from "axios";
const Base_url= "https://places.googleapis.com/v1/places:searchText"
const config={
  headers:{
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API,
   'X-Goog-FieldMask': ['places.displayName','places.photos','places.id']
  }
}
const  GetPlaceDetails= async (data)=>axios.post(Base_url,data,config);
export default GetPlaceDetails;

