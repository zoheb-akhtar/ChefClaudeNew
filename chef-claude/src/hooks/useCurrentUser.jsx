import React, { useEffect, useState } from 'react'
import api from '../api/apiInstance';

export default function useCurrentUser() {
    const [user, setUser] = useState();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const randomLoadTime =  Math.floor(Math.random() * (1600 - 800 + 1)) + 800;


    useEffect(() => {
        async function getUser() {
            const delay = new Promise((resolve) => setTimeout(resolve, randomLoadTime))
            try {
              const { data } = await api.get("/user/me");
              setUser(data); 
              await delay; 
            } catch (error) {
              await delay;
              setError(error?.response?.data?.error || "Something went wrong. Please try again later.")
            } finally {
              setIsLoading(false)
            }

          }
          getUser();
    }, [])

  return [user, error, isLoading]
}
