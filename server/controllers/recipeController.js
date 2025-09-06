const pool = require("../config/db.js");

const addToCookLater = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            title,
            shortDescription,
            difficultyLabel, 
            difficultyScore,
            estimatedCookTime,
            estimatedCaloriesPerServing,
            numberOfServings,
            ingredients,
            instructions,
            dietaryRestrictions
        } = req.body;
        const recipeFound = await pool.query("SELECT * FROM recipes WHERE title = $1 and user_id = $2", [title, userId]);

        if (recipeFound.rows.length > 0) {
            return res.status(409).json({error: "This recipe is already in your saved recipes."})
        }

    
        const query = `INSERT INTO recipes 
        (
            user_id,
            title,
            short_description,
            difficulty_label,
            difficulty_score,
            estimated_cook_time,
            estimated_calories_per_serving,
            number_of_servings,
            ingredients,
            instructions,
            dietary_restrictions,
            status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
    
        const values = [
            userId,
            title,
            shortDescription,
            difficultyLabel, 
            difficultyScore,
            estimatedCookTime,
            estimatedCaloriesPerServing,
            numberOfServings,
            ingredients,
            instructions,
            dietaryRestrictions,
            "cook-later"
        ];
    
        await pool.query(query, values);
        res.status(201).json("Recipe created");
    } catch (error) {
        res.status(500).json({error: "Could not add this recipe to Cook Later. Please try again later."})
    } 
}


const startRecipe = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentStep,
                recipeId,
                title,
                shortDescription,
                difficultyLabel, 
                difficultyScore,
                estimatedCookTime,
                estimatedCaloriesPerServing,
                numberOfServings,
                ingredients,
                instructions,
                dietaryRestrictions
                 } = req.body;


        const foundRecipeCookLater = await pool.query("SELECT * FROM recipes WHERE (id = $1 OR title = $2) AND user_id = $3 AND (status = 'cook-later' OR status = 'completed')", [recipeId, title, userId]);
        if (foundRecipeCookLater.rows.length > 0) {
            await pool.query("UPDATE recipes SET status = 'in-progress', current_step_index = $1, updated_at = NOW() WHERE (id = $2 OR title = $3) AND user_id = $4", [currentStep, recipeId, title, userId]);
            return res.status(200).json("Recipe updated to in-progress");
        }

        const foundRecipeInProgress = await pool.query("SELECT * FROM recipes WHERE id = $1 AND user_id = $2 AND status = 'in-progress'", [recipeId, userId]);
        if (foundRecipeInProgress.rows.length > 0) {
            await pool.query("UPDATE recipes SET current_step_index = $1, updated_at = NOW() WHERE (id = $2 OR title = $3) AND user_id = $4", [currentStep, recipeId, title, userId])
            return res.status(200).json("Recipe found")
        }

        const query = `INSERT INTO recipes 
        (
            user_id,
            title,
            short_description,
            difficulty_label,
            difficulty_score,
            estimated_cook_time,
            estimated_calories_per_serving,
            number_of_servings,
            ingredients,
            instructions,
            status,
            id,
            current_step_index,
            updated_at,
            dietary_restrictions
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), $14)`;
    
        const values = [
            userId,
            title,
            shortDescription,
            difficultyLabel, 
            difficultyScore,
            estimatedCookTime,
            estimatedCaloriesPerServing,
            numberOfServings,
            ingredients,
            instructions,
            "in-progress",
            recipeId,
            currentStep,
            dietaryRestrictions
        ];

        await pool.query(query, values);
        res.status(200).json("Recipe started")
    } catch (error) {
        res.status(500).json({error: "Could not start the recipe. Please try again later."})
    }

}

const finishRecipe = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId, title} = req.body;
        await pool.query("UPDATE recipes SET status = 'completed', times_cooked = times_cooked + 1, current_step_index = -1, updated_at = NOW() WHERE (id = $1 OR title = $2) AND user_id = $3", [recipeId, title, userId]);
        res.status(200).json("Recipe finished")
    } catch (error) {
        res.status(500).json({error: "Could not finish the recipe."})
    }
}

const currentStepUpdate = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId, currentStep, title } = req.body;

        const result = await pool.query("SELECT status FROM recipes WHERE (id = $1 or title = $2) AND user_id = $3", [recipeId, title, userId]);
    
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        } 
        const status = result.rows[0].status;
      
        if (status === 'completed') {
            return res.status(200).json("Can't change step status of completed recipe.");
        }
        
        await pool.query("UPDATE recipes SET current_step_index = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3", [currentStep, recipeId, userId]);
        res.status(200).json("Recipe step updated")
    } catch (error) {
        res.status(500).json({error: "Could not updated the current step."});
    }
}

const getCurrentStep = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipeId = req.params.recipeId;
        const foundRecipe = await pool.query("SELECT * FROM recipes WHERE id = $1 AND user_id = $2", [recipeId, userId]);
        if (foundRecipe.rows.length === 0) {
            return res.status(404).json("Recipe not found");
        }
        const recipe = foundRecipe.rows[0]
        res.status(200).json({recipe: recipe});
    } catch (error) {
        res.status(500).json({error: "Could not get the current step. Please try again later."});
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const {status, searchQuery, favorite, difficulty, cookTime, calsPerServing} = req.query;
        const userId = req.user.id;
        let query = "SELECT * FROM recipes WHERE user_id = $1 ";
        let values = [userId];

        if (status) {
            values.push(status);
            query += `AND status = $${values.length} `;
        }

        if (searchQuery) {
            values.push(`%${searchQuery}%`)
            query += `AND (title ILIKE $${values.length} OR EXISTS (SELECT 1 FROM unnest(dietary_restrictions) AS dr WHERE dr ILIKE $${values.length})) `;
        }

        if (favorite) {
            query += `AND is_favorite = true `;
        }

        if (difficulty) {
            values.push(difficulty);
            query += `AND difficulty_label = $${values.length} `;
        }

        if (cookTime) {
            if (cookTime === "60+") {
                query += `AND estimated_cook_time >= 60 `;
            }  else {
                const [minCook, maxCook] = cookTime.split("-").map(Number);
                values.push(minCook, maxCook);
                query += `AND estimated_cook_time BETWEEN $${values.length - 1} AND $${values.length} `;
            }
            
        }

        if (calsPerServing) {
            if (calsPerServing === "750+") {
                query += `AND estimated_calories_per_serving >= 750 `;
            } else {
                const [minCal, maxCal] = calsPerServing.split("-").map(Number);
                values.push(minCal, maxCal);
                query += `AND estimated_calories_per_serving BETWEEN $${values.length - 1} AND $${values.length} `;
            }
            
        }


        const recipes = await pool.query(`${query} ORDER BY updated_at DESC`, values);
        if (recipes.rows.length === 0) {
            return res.status(200).json({recipes: []});
        }

        res.status(200).json({recipes: recipes.rows});
    } catch (error) {
        res.status(500).json({error: "Could not get all of your recipes. Please try again later."})
    }
}

const flipFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId } = req.body;
        await pool.query("UPDATE recipes SET is_favorite = NOT is_favorite WHERE user_id = $1 AND id = $2", [userId, recipeId]);
        res.status(200).json("Recipe favorite status changed");
    } catch (error) {
        res.status(500).json({error: "Could not change the recipe favorite status. Please try again later."});
    }

}

const deleteRecipe = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId } = req.body;
        await pool.query("DELETE FROM recipes WHERE user_id = $1 AND id = $2", [userId, recipeId]);
        res.status(200).json("Recipe deleted")
    } catch (error) {
        res.status(500).json({error: "Could not delete the recipe. Please try again later."})
    }
}

const cancelCooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId } = req.body;
        await pool.query("UPDATE recipes SET status = 'cook-later', current_step_index = -1 WHERE user_id = $1 AND id = $2", [userId, recipeId]);
        res.status(200).json("Recipe canceled")
    } catch (error) {
        res.status(500).json({error: "Could not cancel cooking the recipe. Please try again later."})
    }
}

const rateRecipe = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId, rating } = req.body;
        await pool.query("UPDATE recipes SET rating = $1 WHERE user_id = $2 AND id = $3", [rating, userId, recipeId]);
        res.status(200).json("Recipe rated")
    } catch (error) {
        res.status(500).json({error: "Could not rate the recipe. Please try again later."});
    }
}

module.exports = {addToCookLater, 
                startRecipe, 
                finishRecipe,
                currentStepUpdate, 
                getCurrentStep, 
                getAllRecipes,
                flipFavorite,
                deleteRecipe,
                cancelCooking,
                rateRecipe};



