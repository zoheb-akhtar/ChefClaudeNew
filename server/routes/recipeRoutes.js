const express = require("express");
const {addToCookLater, 
    startRecipe, 
    finishRecipe, 
    currentStepUpdate, 
    getCurrentStep, 
    getAllRecipes,
    flipFavorite,
    deleteRecipe,
    cancelCooking,
    rateRecipe} = require("../controllers/recipeController");
const authenticateToken = require("../middleware/authorization.js");
const router = express.Router();

router.post("/add_to_cook_later", authenticateToken, addToCookLater);

router.post("/start_recipe", authenticateToken, startRecipe);

router.get("/get_current_step/:recipeId", authenticateToken, getCurrentStep);

router.get("/get_all_recipes", authenticateToken, getAllRecipes);

router.patch("/finish_recipe", authenticateToken, finishRecipe);

router.patch("/update_recipe_progress", authenticateToken, currentStepUpdate);

router.patch("/favorite", authenticateToken, flipFavorite);

router.patch("/cancel_cooking", authenticateToken, cancelCooking);

router.patch("/rate_recipe", authenticateToken, rateRecipe);

router.delete("/delete_recipe", authenticateToken, deleteRecipe);

module.exports = router;