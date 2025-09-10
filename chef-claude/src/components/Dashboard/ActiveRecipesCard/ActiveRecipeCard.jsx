import React from 'react'
import { useNavigate } from 'react-router';
import "./active-recipe-card.css"

export default function ActiveRecipeCard({recipe}) {
    const navigate = useNavigate();

    function recipeToPass(recipe) {
        return {
          createdAt: recipe.created_at,
          currentStepIndex: recipe.current_step_index,
          dietaryRestrictions: recipe.dietary_restrictions,
          difficultyLabel: recipe.difficulty_label,
          difficultyScore: recipe.difficulty_score,
          estimatedCaloriesPerServing: recipe.estimated_calories_per_serving,
          estimatedCookTime: recipe.estimated_cook_time,
          id: recipe.id,
          imageUrl: recipe.image_url,
          ingredients: recipe.ingredients.map(ingredient => JSON.parse(ingredient)),
          instructions: recipe.instructions,
          isFavorite: recipe.is_favorite,
          numberOfServings: recipe.number_of_servings,
          rating: recipe.rating,
          shortDescription: recipe.short_description,
          status: recipe.status,
          timesCooked: recipe.times_cooked,
          title: recipe.title,
          updatedAt: recipe.updated_at,
          userId: recipe.user_id
        }
        
      }

  return (
    <div className="active-recipe-alert">
              <div className="alert-content">
                  <span className="alert-text">
                      You're currently cooking <strong>{recipe.title}</strong> - 
                      Step {recipe.current_step_index + 1} of {recipe.instructions.length + 1}
                  </span>
                  <button className="continue-btn" onClick={() => navigate("/startcooking", {state: {recipe: recipeToPass(recipe)}})}>
                      Continue Cooking
                  </button>
              </div>
          </div>
  )
}
