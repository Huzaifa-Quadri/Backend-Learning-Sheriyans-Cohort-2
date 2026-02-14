const express = require("express");
const app = express();
app.use(express.json());
const authRouter = require("./auth/auth.routes");

app.use("/api/auth", authRouter);

app.get("/home", (req, res) => {
  res.status(200).json({
    message: "Welcome to My Practice Project",
  });
});

module.exports = app;
