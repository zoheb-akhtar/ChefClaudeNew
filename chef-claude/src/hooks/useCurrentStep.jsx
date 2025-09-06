import React, { useEffect, useState } from 'react'
import api from '../api/apiInstance';

export default function useCurrentStep(recipe) {  
    const [currentStep, setCurrentStep] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true)
        async function getCurrentStep() {
          try {
            const res = await api.get(`/recipes/get_current_step/${recipe.id}`);
            const data = res.data; 
            setCurrentStep(data.recipe.current_step_index);
          } catch (error) {
            console.error(error?.response?.data?.error || "Something went wrong. Please try again later.")
          } finally {
            setIsLoading(false)
          }
        }
    
        getCurrentStep()
      }, []);


  return [currentStep, setCurrentStep, isLoading]
}
