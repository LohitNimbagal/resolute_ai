import React from "react"
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useAuth } from "./appwrite/useAuth";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import Loading from "./components/Loading"

export default function App() {

  const [loading, setLoading] = useState(true);
  const { setUserData, logout, login } = useAuth()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          login()
          setUserData(userData)
        } else logout()
      })
      .catch((error) => {
        // Handle error here, like displaying an error message
        console.error("Error fetching current user:", error);
        logout(); // Log out the user in case of an error
      })
      .finally(() => setLoading(false));
  }, [setUserData, logout, login]);

  return !loading ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : <Loading />
}