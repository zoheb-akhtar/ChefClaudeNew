const express = require("express");
const {activeRecipes, 
    recentActivity, 
    userJourney, 
    userStats,
    userMonth} = require("../controllers/userDashboardController.js");
const authenticateToken = require("../middleware/authorization.js");
const router = express.Router();

router.get("/active_recipes", authenticateToken, activeRecipes);

router.get("/recent_activity", authenticateToken, recentActivity);

router.get("/user_journey", authenticateToken, userJourney);

router.get("/user_stats", authenticateToken, userStats);

router.get("/user_month", authenticateToken, userMonth);

module.exports = router;