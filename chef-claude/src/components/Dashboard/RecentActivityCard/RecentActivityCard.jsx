import React from 'react'
import "./recent-activity-card.css"

export default function RecentActivityCard({recipe, index}) {
  return (
    <div key={index} className="recent-recipe-card">
        <div className="recipe-info">
            <div className="recipe-title">{recipe.title}</div>
            <div className="recipe-date">{new Date(recipe.updated_at).toLocaleDateString()}</div>
        </div>
        <div className="recipe-rating">
            <span className="rating-stars">{"★".repeat(Math.floor(recipe.rating / 2))}</span>
            {recipe.rating && <span className="rating-number">{recipe.rating}/10</span>}
        </div>
    </div>
  )
}
