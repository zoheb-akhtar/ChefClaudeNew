import React, { useEffect, useState } from 'react'
import "./view-recipe.css"
import { useLocation } from 'react-router'
import flipFavorite from '../../utils/flipFavorite';
import { progressLabel, progressLabelColor } from '../../utils/progressLabel';
import CtaButton from '../../components/YourRecipes/CtaButton/CtaButton';
import difficultyColor from '../../utils/difficultyColor.js';
import api from '../../api/apiInstance';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import formatDate from '../../utils/formatDate.js';

export default function ViewRecipe() {
    const location = useLocation();
    const {recipeId} = location.state || {};
    const [recipe, setRecipe] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        async function getRecipe() {
            setIsLoading(true)
            try {
                const res = await api.get(`/recipes/recipe/${recipeId}`);
                setRecipe(res.data.recipe);
                setIsFavorite(res.data.recipe.is_favorite)
            } catch (error) {
                toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        getRecipe();

    }, [recipeId])
    
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

    if (isLoading || !recipe) return <Loader />
    return (
        <div className="recipe-container">
            <div className="recipe-header">
                <div className="recipe-title-section">
                    <h1 className="recipe-title">{recipe.title}</h1>
                    <img onClick={() => flipFavorite(setIsFavorite, recipe.id)} src={isFavorite ? "/images/heart-fill-red.svg" : "/images/heart-fill-gray.svg"} className="favorite-heart"></img>
                </div>
                <p className="recipe-description">{recipe.short_description}</p>
                
                <div className="recipe-tags">
                    {recipe.dietary_restrictions && recipe.dietary_restrictions.map((restriction, index) => (
                        <span key={index} className="tag dietary-tag">{restriction}</span>
                    ))}
                    <span 
                        className="tag difficulty-tag" 
                        style={difficultyColor(recipe.difficulty_label)}
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
                            <span style={{color: progressLabelColor(recipe.status).secondaryColor}}className="overview-value">{progressLabel(recipe.status)}</span>
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