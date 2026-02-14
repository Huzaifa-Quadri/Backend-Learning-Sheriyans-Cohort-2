const express = require("express");

const userModel = require("../models/user.model");
const { model } = require("mongoose");
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyExists = userModel.findOne({ email });

  if (userAlreadyExists) {
    res.status(400).json({
      message: "User Alreay Exists with this Email",
    });
  }

  const user = userModel.create(name, email, password);

  res.status(201).json({
    message: "User Created",
    user,
  });
});

module.exports = authRouter;
