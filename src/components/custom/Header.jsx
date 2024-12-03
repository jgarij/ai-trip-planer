import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/Context/UserContext"; // Correct path for context
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Header() {
  const { toast } = useToast();
  const { currUser, setCurrUser } = useUser(); // Access currUser and setCurrUser from the context

  // Update currUser on initial load (if user data exists in localStorage)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("curruser"));
    if (user) setCurrUser(user);
  }, [setCurrUser]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("curruser");
    setCurrUser(null);
    googleLogout();
    toast({
      description: "Logged out successfully",
    });
  };

  // Google Login handler
  const handleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      getUserProfile(codeResponse);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      toast({
        description: "Login failed. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Fetch user profile after successful login
  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("curruser", JSON.stringify(res.data));
        setCurrUser(res.data);
        toast({
          description: "Logged in successfully",
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          description: "Failed to fetch user profile",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="bg-slate-500 flex justify-between p-2">
      <a href="/">
        <div className="text-xl font-bold">Plany..</div>
      </a>

      {currUser ? (
        <div className="flex gap-2 justify-center items-center">
          <a href="/create-trip">
            <Button>Add trip</Button>
          </a>
          <a href="/my-trips">
            <Button>Go to My Trips</Button>
          </a>
          <img
            onClick={handleLogout}
            className="rounded-full h-10 w-10 cursor-pointer"
            src={currUser.picture}
            alt={currUser.name || "User"}
          />
        </div>
      ) : (
        <Button onClick={handleLogin}>Sign in</Button>
      )}
    </div>
  );
}

export default Header;
