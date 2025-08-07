const pool = require("../config/db.js")

const getUser = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        if (user.rows.length === 0) {
            res.statis(404).json("User not found.")
        }
        const loggedInUser = user.rows[0];
        res.status(200).json(loggedInUser);
    } catch (error) {
        res.status(500).json({error: "Could not the user. Please try again later."})
    }
   
}

const getUserRecipes = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipes = await pool.query("SELECT * FROM recipes WHERE user_id = $1", [userId]);
        if (recipes.rows.length === 0) {
            res.status(200).json({message: "You currently have no recipes."});
            return;
        }
        res.status(200).json({recipes: recipes.rows});

    } catch (error) {
        res.status(500).json({error: "Could not get your recipes. Please try again later."});
    }

}


module.exports = {getUser, getUserRecipes};