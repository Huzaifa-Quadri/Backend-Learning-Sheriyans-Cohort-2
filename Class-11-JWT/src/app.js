const express = require("express");
const app = express();
const authRouter = require("./auth/auth.routes");
const userModel = require("./models/user.model");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to JWT Secuity");
});

app.get("/getUser", async (req, res) => {
  const users = await userModel.find();

  res.status(200).json({
    message: "All Users Here",
    users,
  });
});

module.exports = app;
