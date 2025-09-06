import React, { useEffect, useState } from 'react'
import difficultyColor from "../../../utils/difficultyColor.js"
import { progressLabel, progressLabelColor} from '../../../utils/progressLabel.js'
import flipFavorite from '../../../utils/flipFavorite.js'
import api from '../../../api/apiInstance.js'
import toast from 'react-hot-toast'
import CtaButton from '../CtaButton/CtaButton.jsx'
import "./recipe-card.css"
import Modal from '../../Modal/Modal.jsx'
import { useNavigate } from 'react-router'


export default function RecipeCard({recipe, deleteRecipeFromPage}) {
    const [isFavorited, setIsFavorited] = useState(recipe && recipe.is_favorite);
    const [menuToggled, setMenuToggled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    async function deleteRecipe() {
        try {
            await api.delete("/recipes/delete_recipe", {
                data: {
                    recipeId: recipe.id
                }
            });
            deleteRecipeFromPage(recipe.id);
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.");
        }
    }

    function showModalOnClick() {
        setMenuToggled(false)
        setShowModal(true)
    }

  return (
    <div className="your-recipe-card-container" key={recipe.id}>
        <div className="your-recipe-card-top">
            <p style={progressLabelColor(recipe.status)} className="your-recipe-status">{progressLabel(recipe.status)}</p>
            <div className="your-recipe-card-top-right">
            <img className="favorite-icon" onClick={() => flipFavorite(setIsFavorited, recipe.id)} src={isFavorited ? "/images/heart-fill-red.svg" : "/images/heart-fill-gray.svg"}></img>
            <img onClick={() => setMenuToggled(prevToggle => !prevToggle)} className="three-dots-menu" src="/images/more-vertical.svg"></img>
            </div>
             
             {menuToggled && <div onClick={showModalOnClick} className="delete-recipe-container">
                <img className="trash-icon" src="/images/trash.svg"></img>
                <p>Delete</p>
             </div>}

             {showModal && <Modal 
             setShowModal={setShowModal}
             clickFunction={deleteRecipe}
             message={`Are you sure you want to delete ${recipe.title} from your recipes?`}
             ctaButtonMessage="Delete"
             />}
        </div>
        <p className="your-recipe-title">{recipe.title}</p>
        <p className="your-recipe-short-desc">{recipe.short_description}</p>
        {recipe.dietary_restrictions && <div className="your-recipe-dietary-res-container">
            {recipe.dietary_restrictions.map((res, index) => {
                return <div key={index} className="your-recipe-dietary-res">{res}</div>
            })}
        </div>}
            <div className="your-recipe-card-middle">
                <p style={difficultyColor(recipe.difficulty_label)} className="your-recipe-diff-label">{recipe.difficulty_label}</p>
                <p className="your-recipe-cook-time">{recipe.estimated_cook_time} min</p>
                <p className="your-recipe-est-cal">{recipe.estimated_calories_per_serving} cals/serving</p>
            </div>
            <div className="your-recipe-card-bottom">
                <CtaButton recipe={recipe} width="100%"/>
                <button onClick={() => navigate("/viewrecipe", {state: {recipe, isFavorite: isFavorited}})} className="your-recipe-button view-recipe">View Recipe</button>
            </div>
    </div>
  )
}
