const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const crypto = require("crypto");

const authRouter = express.Router();
authRouter.use(cookieparser());

authRouter.post("/register", async (req, res) => {
  const { email, username, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });
  console.log("User Exists Object -", isUserAlreadyExists);

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User with this this " +
        (isUserAlreadyExists.email == email ? "Email" : "Username") +
        " already exists !",
    });
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
});

authRouter.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  //User can logn via - 1. Username and Password
  // 2. - Email and password
  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  if (user.password !== hash) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Logged In Successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
});

module.exports = authRouter;

// MD5 ❌
// Old and broken
// Very fast → easy to crack
// Not secure for passwords
// SHA-256 ✅
// Stronger and more secure
// Harder to break than MD5
// Used for integrity & security
// 👉 Both are hashing algorithms, but never use MD5 for passwords.
// 👉 Even SHA-256 is not ideal for passwords — use bcrypt instead.
