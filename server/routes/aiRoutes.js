const express = require("express");
const generateRecipes = require("../controllers/aiController");
const router = express.Router();

router.post("/generate", generateRecipes);

module.exports = router;
