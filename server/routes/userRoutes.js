const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authorization.js")
const {getUser, getUserRecipes, editFirstName, editLastName, editEmail, deleteAccount} = require("../controllers/userController.js")

router.get("/me", authenticateToken, getUser);

router.get("/recipes", authenticateToken, getUserRecipes);

router.patch("/edit_first_name", authenticateToken, editFirstName);

router.patch("/edit_last_name", authenticateToken, editLastName);

router.patch("/edit_email", authenticateToken, editEmail);

router.delete("/delete_account", authenticateToken, deleteAccount);

module.exports = router;
