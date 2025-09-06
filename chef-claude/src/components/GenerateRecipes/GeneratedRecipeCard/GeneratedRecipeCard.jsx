import React, { useEffect, useState } from 'react'
import "./generated-recipe-card.css"
import difficultyColor from '../../../utils/difficultyColor';
import api from "../../../api/apiInstance.js"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function GeneratedRecipeCard({recipe, dietaryRestrictions}) {
  console.log(recipe)
  const [addedToCookLater, setAddedToCookLater] = useState(false);
  const navigate = useNavigate();
  const storageKey = `${recipe.id}_disabled`

  useEffect(() => {
    const disabled = localStorage.getItem(storageKey);
    if (disabled) {
      setAddedToCookLater(true);
    }
  }, [storageKey])

  async function addToCookLater() { 
    try {
      await api.post("/recipes/add_to_cook_later", {
        title: recipe.title,
        shortDescription: recipe.shortDescription,
        difficultyLabel: recipe.difficultyLabel, 
        difficultyScore: recipe.difficultyScore,
        estimatedCookTime: recipe.estimatedCookTime,
        estimatedCaloriesPerServing: recipe.estimatedCaloriesPerServing,
        numberOfServings: recipe.numberOfServings,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        dietaryRestrictions: dietaryRestrictions,
      });
      setAddedToCookLater(true);
      localStorage.setItem(storageKey, "true");

    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.");
    }
  }
  
  return (
    <div className="recipe-card-container">
      <p className="recipe-title">{recipe.title}</p>
      <p>{recipe.shortDescription}</p>
      <div className="recipe-info-container">
        <p style={difficultyColor(recipe.difficultyLabel)}><span style={difficultyColor(recipe.difficultyLabel)} className="bullet">•</span>{recipe.difficultyLabel}</p>
        <p>{recipe.estimatedCaloriesPerServing} cal</p>
        <p>{recipe.estimatedCookTime} min</p>
      </div>
      <div className="recipe-buttons-container">
        <button onClick={() => navigate("/startcooking", {state: {recipe, dietaryRestrictions}})} className="start-cooking-button">Start Cooking</button>
        <button disabled={addedToCookLater} onClick={addToCookLater} className="add-to-recipes-button">{addedToCookLater ? "Added!" : "Add To Cook Later"}{addedToCookLater && <img src="/images/check-circle.svg"></img>}</button>
      </div>
    </div>
  )
}
