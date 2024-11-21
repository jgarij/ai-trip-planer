import React from "react";
import { GoogleLogin } from "@react-oauth/google";
const responseMessage = (response) => {
    console.log(response)
  
};
const errorMessage = (error) => {
    console.log(error);
};

export default function Google_login() {
  return (
    <div>
   
    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
</div>
  )
}
