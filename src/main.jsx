
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"
import App from './App.jsx'
import * as React from "react";
import { UserProvider } from './Context/UserContext';
import { Link } from 'react-router-dom';
import My_Trips from './components/view-trip/My-trips';
import Footer from './components/custom/Footer';
import { Toaster } from './components/ui/toaster';
import CreateTrip from "./create-trip/index.jsx"
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Header from './components/custom/Header';
import TripDetails from './components/view-trip/TripDetails';
const router = createBrowserRouter([
  {
    
    path: "/",
    element: <App/>
  },
  {path:"/create-trip",
    element:<CreateTrip/>
  },
  {
    path:"/trip-details/:tripId",
    element:<TripDetails/>
  },
  {
    path:"/my-trips",
    element:<My_Trips/>
  }

]);
const client_id = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID;
createRoot(document.getElementById('root')).render(
 
 <GoogleOAuthProvider clientId={client_id}>
  <UserProvider>
  <Header/>
  <Toaster/>
  <RouterProvider router={router} />
  
  <Footer></Footer>
  </UserProvider>
  </GoogleOAuthProvider>


)
