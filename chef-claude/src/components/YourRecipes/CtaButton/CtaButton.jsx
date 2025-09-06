import React from 'react'
import api from '../../../api/apiInstance'
import { useNavigate } from "react-router-dom"
import "./cta-button.css"
import toast from 'react-hot-toast';

export default function CtaButton({recipe, width}) {
    const navigate = useNavigate();
    const recipeToPass = {
        createdAt: recipe.created_at,
        currentStepIndex: recipe.current_step_index,
        difficultyLabel: recipe.difficulty_label,
        difficultyScore: recipe.difficulty_score,
        estimatedCaloriesPerServing: recipe.estimated_calories_per_serving,
        estimatedCookTime: recipe.estimated_cook_time,
        id: recipe.id,
        imageUrl: recipe.image_url,
        ingredients: recipe.ingredients.map(i => JSON.parse(i)),
        instructions: recipe.instructions,
        isFavorite: recipe.is_favorite,
        numberOfServings: recipe.number_of_servings,
        shortDescription: recipe.short_description,
        status: recipe.status,
        timesCooked: recipe.times_cooked,
        title: recipe.title,
        updatedAt: recipe.updated_at,
        userId: recipe.user_id
      };
      
    if (recipe.status === "completed" || recipe.status === "cook-later") {
        return <button style={{width: width}} onClick={() => navigate("/startcooking", {state: {recipe: recipeToPass, dietaryRestrictions: recipe.dietary_restrictions}})} className="your-recipe-button start-cooking">Start Cooking</button>
    } else if (recipe.status === "in-progress") {
        return <button style={{width: width}} onClick={() => navigate("/startcooking", {state: {recipe: recipeToPass, dietaryRestrictions: recipe.dietary_restrictions}})}className="your-recipe-button resume-cooking">Resume ({recipe.current_step_index + 1}/{recipe.instructions.length + 1})</button>
    }
}
