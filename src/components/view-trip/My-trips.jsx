import React, { useEffect ,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import kasis1 from "./kasis1.jpg"
import TripCard from './TripCard';
export default function My_Trips() {
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore
  const [tripData,setTripData]=useState([]);
 
   const GetuserTrips = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('curruser'));
      if (!user) {
        navigate('/');
        return;
      }
      console.log(user.email);
      const tripsQuery = query(
        collection(db, 'AI_Trips'),
        where('userdata', '==', user.email)
      );
      const querySnapshot = await getDocs(tripsQuery);
      if (querySnapshot.empty) {
        console.log('No trips found for this user.');
      } else {
        querySnapshot.forEach((doc) => {
          setTripData((prev=>[...prev,doc.data()]))
        });
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    GetuserTrips();
    setTripData([])
  }, []);
  console.log(tripData)



  return (
    <div>
      <h2 className="font-bold">My Trips</h2>
      {tripData && tripData.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {tripData.map((m, index) => (
       
          <TripCard m={m} index={index}/>
          ))}
        </div>
      ) : (
        <p>No trips available.</p>
      )}
    </div>
  );
}