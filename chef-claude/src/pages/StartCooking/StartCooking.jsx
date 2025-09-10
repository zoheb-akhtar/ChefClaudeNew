import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import difficultyColor from '../../utils/difficultyColor';
import { useNavigate } from 'react-router-dom';
import showCurrentStep from '../../utils/showCurrentStep';
import "./start-cooking.css"
import api from '../../api/apiInstance';
import toast from 'react-hot-toast';
import useCurrentStep from '../../hooks/useCurrentStep';
import Modal from '../../components/Modal/Modal';
import RatingModal from '../../components/Modal/RatingModal';
import Loader from '../../components/Loader/Loader';

export default function StartCooking() {
  
    const location = useLocation();
    const {recipe, dietaryRestrictions} = location.state || {};
    const [currentStep, setCurrentStep, isLoading] = useCurrentStep(recipe);
    const [showNext, setShowNext] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [recipeRated, setRecipeRated] = useState(false);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
  
  function LeftButton() {
    return currentStep > 0 && <button onClick={currentStep > 0 ? handlePreviousStep : null} className="button-sc scroll-button"><img className="scroll-button-arrow" src="/images/chevron-left.svg"></img>Previous Step</button>  
  }

  function RightButton() {
    if (currentStep < recipe.instructions.length) {
      return <button onClick={handleNextStep} className="button-sc scroll-button">Next Step<img className="scroll-button-arrow" src="/images/chevron-right.svg"></img></button>
    } else if (currentStep === recipe.instructions.length) {
      return <button onClick={handleFinish} className="button-sc">Finish Recipe</button>
    } else if (currentStep === recipe.instructions.length + 1) {
      return <button onClick={() => navigate("/yourrecipes")} className="button-sc go-to-button">Go To Your Recipes</button>
    }
     
  }


async function startRecipe(step) {
  try {
    await api.post("/recipes/start_recipe", {
      currentStep: step,
      recipeId: recipe.id,
      title: recipe.title,
      shortDescription: recipe.shortDescription,
      difficultyLabel: recipe.difficultyLabel, 
      difficultyScore: recipe.difficultyScore,
      estimatedCookTime: recipe.estimatedCookTime,
      estimatedCaloriesPerServing: recipe.estimatedCaloriesPerServing,
      numberOfServings: recipe.numberOfServings,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      dietaryRestrictions: dietaryRestrictions
    })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.");
  }
}

async function finishRecipe() {
  try {
    await api.patch("/recipes/finish_recipe", {
      recipeId: recipe.id,
      title: recipe.title
    })
    setCompleted(true)
  } catch (error) {
    toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.");
  }
}

async function handleStepChange(step) {
  try {
    await api.patch("/recipes/update_recipe_progress", {
      recipeId: recipe.id,
      currentStep: step,
      title: recipe.title
    })
  } catch (error) {
    toast.error(error?.response?.data?.error || "Something went wrong. Please try again later.");
  }
}

  function handleNextStep() {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    handleStepChange(nextStep);
  }

  function handlePreviousStep() {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    handleStepChange(prevStep);
  }

  function handleStart() {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    console.log("Starting recipe with currentStep:", nextStep);
    startRecipe(nextStep);
  }

  function handleFinish() {
    finishRecipe();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  }

  async function cancelCooking() {
    try {
      await api.patch("/recipes/cancel_cooking", {
        recipeId: recipe.id
      })
      navigate("/yourrecipes")
    } catch (error) {
      toast.error("Could not cancel the recipe. Please try again later");
    }
  }

  async function rateRecipe() {
    try {
      await api.patch("/recipes/rate_recipe", {
        recipeId: recipe.id,
        rating: rating
      })
      setRecipeRated(true)
    } catch (error) {
      toast.error("Could not rate the recipe. Please try again later");
    }
  }

  if (!recipe) {
    return <div className="recipe-not-found">Oops! Recipe not found!</div>
  }

  if (isLoading) return <Loader />

  return (
    <div className="start-cooking-page-container">
      <div className="recipe-card-sc">
      <p className="recipe-title-sc">{recipe.title}</p>
      <p className="recipe-desc-sc">{recipe.shortDescription}</p>
      <div className="recipe-info-sc">
        <p className="recipe-diff-sc"><span className="recipe-info-label-sc">Difficulty: </span><span style={difficultyColor(recipe.difficultyLabel)}>{recipe.difficultyLabel}</span><span className="recipe-info-label-sc">, Score: </span><span style={difficultyColor(recipe.difficultyLabel)}>{recipe.difficultyScore} / 10</span></p>
        <p className="recipe-est-sc"><span className="recipe-info-label-sc">Step Count: </span> {recipe.instructions.length + 1} steps</p>
        <p className="recipe-est-sc"><span className="recipe-info-label-sc">Estimated Cook Time: </span> {recipe.estimatedCookTime} min</p>
        <p className="recipe-cals-sc"><span className="recipe-info-label-sc">Calories Per Serving: </span> {recipe.estimatedCaloriesPerServing}</p>
        <p className="recipe-servings-sc"><span className="recipe-info-label-sc">Servings: </span> {recipe.numberOfServings}</p>
      </div>

      <div className="recipe-ings-container-sc">
        <p>Ingredients</p>
        <div className="ings-container">
          <ul>
          {recipe.ingredients.map((ingredient, index) => {
            return <li key={index} className="recipe-ing">{ingredient.ingredient}: {ingredient.amount} </li>
          })}
          </ul>
        </div>
      </div>
      </div>
      
      <div className="start-cooking-steps-container">
        {currentStep > -1 && currentStep < recipe.instructions.length + 1 ? <div className="progress-container">

        <div className="steps-top-container">
        <p className="step-indicator">Step {currentStep + 1} of {recipe.instructions.length + 1}</p>
        {!completed && <button onClick={() => setShowModal(true)}className="start-cooking-button cancel-cooking-button">Cancel Cooking</button>}
        </div>
        <progress className="progress-bar-sc" value={`${currentStep}`} max={`${recipe.instructions.length}`}></progress>
        </div> : null}

        {showModal && <Modal 
        setShowModal={setShowModal}
        clickFunction={cancelCooking}
        message={`Are you sure you want to stop cooking ${recipe.title}? All of your progress will be lost.`}
        ctaButtonMessage="Cancel Cooking"
        />}

        <div className="recipe-instruction">
          {currentStep === recipe.instructions.length + 1 ? `Well done on finishing ${recipe.title}!` : showCurrentStep(recipe, currentStep)}
        </div>

        {currentStep > -1 && currentStep < recipe.instructions.length ? <div className="show-next-container">
          <div onClick={() => setShowNext(prevNext => !prevNext)}className="show-next-toggle">
            <p>Preview Next Step</p>
            <img src="/images/chevron-down.svg"></img>
          </div>
          {showNext && <div className="next-step-container">
            <p>{recipe.instructions[currentStep]}</p>
          </div>}
        </div> : null}

        {currentStep === -1 && <div className="start-cooking-button-container">
          <button onClick={handleStart} className="button-sc start-cooking-button">Start Cooking</button> 
        </div>}

        {currentStep > -1 &&
        <div className="scroll-buttons-container">
        <LeftButton />
        <RightButton />
         </div>}
         {currentStep === recipe.instructions.length + 1 && <div className="start-cooking-button-container">
          <button disabled={recipeRated} onClick={() => setShowRating(true)}className="rate-button start-cooking-button">{recipeRated ? "Recipe Rated!" : "Rate This Recipe"}</button>
         </div>}
        
          {showRating && <RatingModal 
          setShowModal={setShowRating} 
          clickFunction={rateRecipe} 
          message={`Rate ${recipe.title}.`}
          ctaButtonMessage="Rate This Recipe"
          rating={rating}
          setRating={setRating}
          recipeRated={recipeRated}
          />}
         
      </div>
    </div>
  )
}

