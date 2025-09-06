import React, { useState } from 'react'
import "./view-recipe.css"
import { useLocation } from 'react-router'
import flipFavorite from '../../utils/flipFavorite';
import CtaButton from '../../components/YourRecipes/CtaButton/CtaButton';

export default function ViewRecipe() {
    const location = useLocation();
    const {recipe, isFavorite} = location.state || {};
    const [isFavorited, setIsFavorited] = useState(isFavorite)
    
    const parseIngredients = (ingredientsArray) => {
        return ingredientsArray.map(ingredientStr => {
            try {
                return JSON.parse(ingredientStr);
            } catch (e) {
                return { ingredient: ingredientStr, amount: '' };
            }
        });
    };

    const parsedIngredients = recipe ? parseIngredients(recipe.ingredients) : [];

    const getDifficultyColor = (difficulty) => {
        switch(difficulty.toLowerCase()) {
            case 'easy': return '#22c55e';
            case 'medium': return '#f59e0b';
            case 'hard': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="recipe-container">
            <div className="recipe-header">
                <div className="recipe-title-section">
                    <h1 className="recipe-title">{recipe.title}</h1>
                    <img onClick={() => flipFavorite(setIsFavorited, recipe.id)} src={isFavorited ? "/images/heart-fill-red.svg" : "/images/heart-fill-gray.svg"} className="favorite-heart"></img>
                </div>
                <p className="recipe-description">{recipe.short_description}</p>
                
                <div className="recipe-tags">
                    {recipe.dietary_restrictions && recipe.dietary_restrictions.map((restriction, index) => (
                        <span key={index} className="tag dietary-tag">{restriction}</span>
                    ))}
                    <span 
                        className="tag difficulty-tag" 
                        style={{ color: getDifficultyColor(recipe.difficulty_label) }}
                    >
                        {recipe.difficulty_label.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="recipe-content">
                <div className="recipe-overview">
                    <div className="overview-header">
                        <h2>Overview</h2>
                        <CtaButton recipe={recipe} width="auto"/>
                    </div>
                    
                    <div className="overview-grid">
                        <div className="overview-item">
                            <span className="overview-label">Status</span>
                            <span className="overview-value status-completed">{recipe.status}</span>
                        </div>
                        <div className="overview-item">
                            <span className="overview-label">Times Cooked</span>
                            <span className="overview-value">{recipe.times_cooked}</span>
                        </div>
                        <div className="overview-item">
                            <span className="overview-label">Last Cooked</span>
                            <span className="overview-value">{formatDate(recipe.updated_at)}</span>
                        </div>
                        <div className="overview-item">
                            <span className="overview-label">Cook Time</span>
                            <span className="overview-value">{recipe.estimated_cook_time} minutes</span>
                        </div>
                        <div className="overview-item">
                            <span className="overview-label">Servings</span>
                            <span className="overview-value">{recipe.number_of_servings}</span>
                        </div>
                        <div className="overview-item">
                            <span className="overview-label">Calories/Serving</span>
                            <span className="overview-value">{recipe.estimated_calories_per_serving}</span>
                        </div>
                        <div className="overview-item">
                            <span className="overview-label">Your Rating</span>
                            <span className="overview-value">{recipe.rating ? `${recipe.rating}/10` : "Not rated"}</span>
                        </div>
                        <div className="overview-item">
                            <span className="overview-label">Difficulty Score</span>
                            <span className="overview-value">{recipe.difficulty_score}/10</span>
                        </div>
                    </div>
                </div>

                <div className="ingredients-section">
                    <h2>Ingredients</h2>
                    <div className="ingredients-grid">
                        {parsedIngredients.map((ingredient, index) => (
                            <div key={index} className="ingredient-item">
                                <span className="ingredient-name">{ingredient.ingredient}</span>
                                <span className="ingredient-amount">{ingredient.amount}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="instructions-section">
                    <h2>Instructions</h2>
                    <ol className="instructions-list">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index} className="instruction-item">
                                {instruction}
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="recipe-meta">
                    <div className="meta-item">
                        <span className="meta-label">Created:</span>
                        <span className="meta-value">{formatDate(recipe.created_at)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}