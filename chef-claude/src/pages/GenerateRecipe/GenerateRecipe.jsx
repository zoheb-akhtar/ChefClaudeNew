import React, { useEffect, useState, useRef } from 'react'
import "./generate-recipes.css"
import api from '../../api/apiInstance';
import FormInput from '../../components/GenerateRecipes/FormInput/FormInput';
import GeneratedRecipeCard from '../../components/GenerateRecipes/GeneratedRecipeCard/GeneratedRecipeCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InlineLoader from '../../components/Loader/InlineLoader';


export default function GenerateRecipe() {
  const [recipes, setRecipes, clearRecipes] = useLocalStorage([], "recipes");
  const [ingredients, setIngredients, clearIngredients] = useLocalStorage([], "ingredients");
  const [dietaryRestrictions, setDietaryRestrictions, clearDietaryRestrictions] = useLocalStorage([], "dietaryRestrictions");
  const [currentDietaryRestriction, setCurrentDietaryRestriction] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const recipeSection = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (recipes.length != 0 && recipeSection.current != null) {
      recipeSection.current.scrollIntoView({behavior: "smooth"})
    }
  }, [recipes])

  async function handleSubmit() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await api.post("/ai/generate", {ingredients, dietaryRestrictions});
  
      const generatedRecipes = data.response;
      setRecipes(generatedRecipes);
      localStorage.setItem("recipes", JSON.stringify(generatedRecipes));
      setError("");
      setIsLoading(false);

    } catch (error) {
      setError(error?.response?.data?.error || "Something went wrong. Please try again later.")
      setIsLoading(false);
      setRecipes([]); 
      localStorage.removeItem("recipes"); 
    }
  }

  function restart() {
    clearRecipes();
    localStorage.removeItem("ingredients");
    setIngredients([]);
    localStorage.removeItem("dietaryRestructions");
    setDietaryRestrictions([]);
    Object.keys(localStorage).forEach((key) => {
      if (key.endsWith("_disabled")) {
        localStorage.removeItem(key);
      }
    })
  }

  return (
    <>
        <div className="generate-recipes-page-container">
          <div className="form-container fade-in-up">
            <div className="top-container">
              <p className="generate-recipes-title">Generate Recipes</p>
              <p className="generate-recipes-subtitle">Enter a list of ingredients you have on hand to generate 3 unqiue recipes.</p><br></br>
              <p>You need at least 4 ingredients to generate recipes.</p>
            </div>

            <FormInput 
            inputLabel="Ingredients"
            placeholder="e.g chicken, avocado, rice"
            currentItem={currentIngredient}
            setItems={setIngredients}
            setCurrentItem={setCurrentIngredient}
            items={ingredients}
            localStorageKey="ingredients"
            />

            <FormInput 
            inputLabel="Dietary Restrictions"
            placeholder="Enter your dietary preferences (optional)"
            currentItem={currentDietaryRestriction}
            setItems={setDietaryRestrictions}
            setCurrentItem={setCurrentDietaryRestriction}
            items={dietaryRestrictions}
            localStorageKey="dietaryRestrictions"
            />
            

            {ingredients.length >= 4 && 
            <div className="ready-to-generate-container">
              <div className="ready-to-generate-container-left-section">
                <p className="ready-to-generate-title">Ready to generate some recipes?</p>
                <p className="ready-to-generate-subtitle">Generate some recipes from your list of ingredients and dietary preferences</p>
              </div>
              <button onClick={handleSubmit} className="generate-recipes-button">{isLoading ? <InlineLoader /> : "Get Recipes"}</button>
              </div>}
              {recipes.length > 0 && <button className="clear-all-button" onClick={restart}>Clear All</button>}
          {error && <ErrorMessage error={error} bgColor="#fbfbf9"/>}
          </div>
          {recipes && <div ref={recipeSection} className="recipes-container">
          {recipes.map((recipe) => {
            return <GeneratedRecipeCard key={recipe.id} recipe={recipe} dietaryRestrictions={dietaryRestrictions}/>
          })}
          </div>}
        </div>
        
    </>

  )
}
