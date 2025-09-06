import React from 'react'
import "./active-recipe-card.css"

export default function ActiveRecipeCard({recipe}) {
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
