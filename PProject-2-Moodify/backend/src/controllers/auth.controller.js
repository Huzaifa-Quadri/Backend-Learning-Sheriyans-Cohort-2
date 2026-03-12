const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  try {
    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isAlreadyRegistered) {
      return res.status(400).json({
        message: "User with same email or password already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: username,
      email: email,
      password: hashed,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "Users registered Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (er) {
    console.error("Error in Registering user : ", er);
  }
}

async function loginUserController(req, res) {
  const { username, email, password } = req.body;

  try {
    const user = await userModel
      .findOne({
        $or: [{ email }, { username }],
      })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        //! Ask GPT why we did this instead of no user found
        message: "Invalid Credentials",
      });
    }

    const isvalidPassword = await bcrypt.compare(password, user.password);
    if (!isvalidPassword) {
      return res.status(400).json({
        //! Ask GPT why we did this instead of no user found
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User Logged in Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (er) {
    console.error(er);
  }
}

async function getMeController(req, res) {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    res.status(200).json({
      message: "User fetched Successfully",
      user,
    });
  } catch (error) {
    console.error("\n\n\nError in Getting user :\n\n\n", error);
    res.status(400).json({
      message: "Error in Getting user",
      error,
    });
  }
}

async function logoutController(req, res) {
  try {
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  getMeController,
};
