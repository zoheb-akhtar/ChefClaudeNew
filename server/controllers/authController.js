const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtTokens = require("../utils/jwtHelpers.js")
const saltRounds = 10;


const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const users = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if (users.rows.length > 0) {
            return res.status(409).json({error: "A user with this email already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await pool.query("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *", [email, hashedPassword, firstName, lastName]);
        const user = newUser.rows[0];
        delete user.password;

        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json({error: "Could not register the user. Please try again later."});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const users = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (users.rows.length == 0) {
            return res.status(401).json({error: "Incorrect email or password."})
        } 
        const passwordMatch = await bcrypt.compare(password, users.rows[0].password)
        if (!passwordMatch) {
            return res.status(401).json({error: "Incorrect email or password."});
        }

        let tokens = jwtTokens(users.rows[0]);
        res.cookie('refresh_token', tokens.refreshToken, {httpOnly:true});
        res.json(tokens);

    } catch (error) {
        res.status(500).json({error: "Could not log in user. Please try again later."});
    }
}

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ error: "Null refresh token" });
    }
  
    try {
      const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const tokens = jwtTokens(user);
      
      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        secure: false,        
        sameSite: 'Lax', 
      });
  
      res.json({ accessToken: tokens.accessToken });
    } catch (err) {
      return res.status(403).json({ error: "Error in refreshing the token." });
    }
  };

const deleteToken = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({message: "Refresh token deleted"});
    } catch (error) {
        res.status(500).json({error: "Error in deleting the token."});
    }
}

module.exports = {register, login, refreshToken, deleteToken}