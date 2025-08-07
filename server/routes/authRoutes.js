const express = require("express");
const {register, login, refreshToken, deleteToken} = require("../controllers/authController.js")
const router = express.Router();

router.post("/register", register)

router.post("/login", login)

router.post("/refresh_token", refreshToken)

router.delete("/delete_token", deleteToken)

module.exports = router;