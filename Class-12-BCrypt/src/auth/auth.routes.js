const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const crypto = require("crypto");

authRouter.use(cookieparser());

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyexists = await userModel.findOne({ email });
  console.log(userAlreadyexists);

  if (userAlreadyexists) {
    return res.status(409).json({
      message: "User already Exists",
    });
  }

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
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  // console.log("\n\nHere is Our User :\n\n", user);

  if (!user) {
    return res.status(404).json({
      message: "User with this Email Not Found :(",
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
      email: email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "Logged in successfully",
    // user,
    token,
  });
});

authRouter.get("/getUser", async (req, res) => {
  const users = await userModel.find();

  res.status(200).json({
    message: "All Users Here",
    users,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "Here are cookies",
  });
});

module.exports = authRouter;
