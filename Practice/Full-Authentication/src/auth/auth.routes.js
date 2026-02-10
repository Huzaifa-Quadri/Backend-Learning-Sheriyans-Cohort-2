const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const crypto = require("crypto");
const authRouter = express.Router();

authRouter.use(cookieparser());

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyexists = await userModel.findOne({ email });

  if (userAlreadyexists) {
    return res.status(409).json({
      message: "User with this Email Already exists",
    });
  }

  try {
    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("jwt_token", token);

    res.status(201).json({
      message: "User Created Successdully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error Creating User",
      err,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User with this Email not Found",
    });
  }

  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  if (user.password !== hashedPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("jwt-token", token);

  res.status(200).json({
    message: "User Signed in Successfully",
  });
});

authRouter.get("/getUser", async (req, res) => {
  const users = await userModel.find();

  res.status(200).json({
    message: "Here are all users",
    users,
  });
});

module.exports = authRouter;
