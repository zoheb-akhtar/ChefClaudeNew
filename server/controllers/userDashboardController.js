const pool = require("../config/db.js")

const activeRecipes = async (req, res) => {
   try {
       const userId = req.user.id;
       const activeRecipe = await pool.query("SELECT * FROM recipes WHERE status = 'in-progress' AND user_id = $1", [userId]);
       if (activeRecipe.rows.length === 0) {
           return res.status(200).json({activeRecipes: []});
       } 
       res.status(200).json({activeRecipes: activeRecipe.rows})

   } catch (error) {
       res.status(500).json({error: "Could not get active recipes"});
   }
}

const recentActivity = async (req, res) => {
   try {
       const userId = req.user.id;
       const recentActivity = await pool.query("SELECT * FROM recipes WHERE user_id = $1 AND status = 'completed' ORDER BY updated_at DESC LIMIT 3", [userId]);
       if (recentActivity.rows.length === 0) {
           return res.status(200).json({recentActivity: []});
       } 

       res.status(200).json({recentActivity: recentActivity.rows})
   } catch (error) {
       res.status(500).json({error: "Error getting recent activity"})
   }
}
 
const userJourney = async (req, res) => {
   try {
       const userId = req.user.id;
       const totalRecipesCreatedResult = await pool.query("SELECT COUNT(*) FROM recipes WHERE status = 'completed' AND user_id = $1", [userId]);
       const mostCookedRecipeResult = await pool.query("SELECT * FROM recipes WHERE times_cooked = (SELECT MAX(times_cooked) FROM recipes WHERE user_id = $1) AND user_id = $1", [userId]);
       
       res.status(200).json({userJourney: {
           totalRecipesCreated: parseInt(totalRecipesCreatedResult.rows[0]?.count, 10) || 0,
           mostCookedRecipe: mostCookedRecipeResult.rows[0] || null
       }
       })

   } catch (error) {
       res.status(500).json({error: "Error getting user journey"})
   }
}

const userStats = async (req, res) => {
   try {
       const userId = req.user.id;
       const averageDifficulty = await pool.query("SELECT AVG(difficulty_score) FROM recipes WHERE user_id = $1", [userId]);
       const highestRated = await pool.query("SELECT * FROM recipes WHERE rating = (SELECT MAX(rating) from recipes WHERE user_id = $1) AND user_id = $1", [userId]);
       const averageRating = await pool.query("SELECT AVG(rating) FROM recipes WHERE user_id = $1", [userId]);
       const mostUsedIngredients = await pool.query(`SELECT 
                                                    (ingredient_text::json)->>'ingredient' as ingredient, 
                                                    COUNT(*) AS usage_count
                                                FROM recipes,
                                                UNNEST(ingredients) AS ingredient_text
                                                WHERE user_id = $1
                                                GROUP BY (ingredient_text::json)->>'ingredient'
                                                ORDER BY usage_count DESC
                                                LIMIT 7`, [userId]);

       res.status(200).json({userStats: {
           averageDifficulty: parseFloat(averageDifficulty.rows[0]?.avg) || 0,
           highestRated: highestRated.rows[0] || null,
           averageRating: parseFloat(averageRating.rows[0]?.avg) || 0,
           mostUsedIngredients: mostUsedIngredients.rows || []
       }})
   } catch (error) {
       res.status(500).json({error: "Error getting user stats"})
   }
}

const userMonth = async (req, res) => {
    try {
        const userId = req.user.id;
        const monthlyStats = await pool.query(`
                                    SELECT 
                                    COUNT(*) FILTER (WHERE status = 'completed') as recipes_completed,
                                    COUNT(*) FILTER (WHERE is_favorite = true) as new_favorites,
                                    COUNT(DISTINCT DATE(updated_at)) as cooking_days
                                FROM recipes 
                                WHERE user_id = $1 
                                AND DATE_TRUNC('month', updated_at) = DATE_TRUNC('month', CURRENT_DATE)
                                            `, [userId])
    res.status(200).json({userMonth: {
        recipesCompleted: parseInt(monthlyStats.rows[0].recipes_completed) || 0,
        newFavorites: parseInt(monthlyStats.rows[0].new_favorites) || 0,
        cookingDays: parseInt(monthlyStats.rows[0].cooking_days) || 0
    }})
    } catch (error) {
        res.status(500).json({error: "Error getting user month"})
    }
}

module.exports = {
    activeRecipes,
    recentActivity,
    userJourney,
    userStats,
    userMonth
}