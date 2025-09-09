const pool = require("../config/db.js")

const getUser = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        if (user.rows.length === 0) {
            res.status(404).json("User not found.")
        }
        const loggedInUser = user.rows[0];
        res.status(200).json(loggedInUser);
    } catch (error) {
        res.status(500).json({error: "Could not get user information. Please try again later."})
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

const editFirstName = async (req, res) => {
    try {
        const userId = req.user.id;
        const { value } = req.body;
        await pool.query("UPDATE users SET first_name = $1 WHERE id = $2", [value, userId]);
        res.status(200).json("First name updated")
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const editLastName = async (req, res) => {
    try {
        const userId = req.user.id;
        const { value } = req.body;
        await pool.query("UPDATE users SET last_name = $1 WHERE id = $2", [value, userId]);
        res.status(200).json("Last name updated")
    } catch (error) {
        res.status(500).json({error: "Could not edit your last name. Please try again later."})
    }
}

const editEmail = async (req, res) => {
    try {
        const userId = req.user.id;
        const { value } = req.body;
        await pool.query("UPDATE users SET email = $1 WHERE id = $2", [value, userId]);
        res.status(200).json("Email updated")
    } catch (error) {
        res.status(500).json({error: "Could not edit your email. Please try again later."})
    }
}

const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        await pool.query("DELETE from recipes WHERE user_id = $1", [userId]);
        await pool.query("DELETE FROM users WHERE id = $1", [userId]);
        res.status(200).json("Account deleted")
    } catch (error) {
        res.status(500).json({error: "Could not delete your acccount. Please try again later."})
    }
}


module.exports = {getUser, 
                getUserRecipes,
                editFirstName,
                editLastName,
                editEmail,
                deleteAccount};