const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authorization.js")
const {getUser, getUserRecipes} = require("../controllers/userController.js")

router.get("/me", authenticateToken, getUser);

router.get("/recipes", authenticateToken, getUserRecipes)

module.exports = router;
