require("dotenv").config();
const { Pool } = require("pg");

let pool;

try {
    pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        poolMode: process.env.POOL_MODE
    })
} catch (error) {
    console.error("Error connecting to the database", error);
}

module.exports = pool;





