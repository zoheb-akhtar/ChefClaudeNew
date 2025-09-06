import React from 'react'
import "./most-used-ingredient.css"

export default function MostUsedIngredient({ingredient, index}) {
  return (
    <div key={index} className="ingredient-item">
        <span className="ingredient-name">{ingredient.ingredient}</span>
        <span className="ingredient-count">{ingredient.usage_count} recipes</span>
    </div>
  )
}
