const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const aiRouter = require("./routes/aiRoutes.js");
const recipeRouter = require("./routes/recipeRoutes.js")
const port = 8080;

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);

app.use("/user", userRouter);

app.use("/ai", aiRouter);

app.use("/recipes", recipeRouter);

app.get("/ping", (req, res) => {
    res.send("Server pinged")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})