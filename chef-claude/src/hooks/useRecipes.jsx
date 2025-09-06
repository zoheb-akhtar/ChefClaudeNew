import React, { useEffect, useState } from 'react'
import api from '../api/apiInstance';

export default function useRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [noRecipes, setNoRecipes] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const randomLoadTime =  Math.floor(Math.random() * (1600 - 800 + 1)) + 800;
    

    useEffect(() => {
    async function getAllRecipes() {
        const delay = new Promise((resolve) => setTimeout(resolve, randomLoadTime))
        try {
            const res = await api.get("/recipes/get_all_recipes");
            if (res.data.length === 0) {
                setNoRecipes(true);
                await delay;
                return;
            }
            setRecipes(res.data.recipes);
            await delay;
        } catch (error) {
            setError(error?.response?.data?.error || "Something went wrong. Please try again later.")
            await delay;
        } finally {
            setIsLoading(false);
        }
        }
    getAllRecipes()
    }, [])

  return [recipes, setRecipes, noRecipes, isLoading, setNoRecipes, error]
}
