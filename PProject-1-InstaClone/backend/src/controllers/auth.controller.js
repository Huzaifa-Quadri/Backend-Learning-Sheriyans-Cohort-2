const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// const crypto = require("crypto");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  try {
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
    // console.log("User Exists Object -", isUserAlreadyExists);

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message:
          "User with this this " +
          (isUserAlreadyExists.email == email ? "Email" : "Username") +
          " already exists !",
      });
    }
    // const hash = crypto.createHash("sha256").update(password).digest("hex");
    const hash = await bcrypt.hash(password, 10); //? we pass password to hash and salt
    //Salt specify how many layers of hashing will be done

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
        username: user.username,
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
  } catch (err) {
    console.error("Error in Registering User ", err);
  }
}

async function loginController(req, res) {
  try {
    const { username, email, password } = req.body;

    //User can logn via - 1. Username and Password
    // 2. - Email and password
    const user = await userModel
      .findOne({
        $or: [
          {
            username: username,
          },
          {
            email: email,
          },
        ],
      })
      .select("+password");
    //Read comment below to understand why we used .select("+password")
    //? In user.model.js we have used select:false in password field
    //? So by default password will be undefined
    //? But here we need password to compare with the password entered by the user
    //? So we used .select("+password") to force the system to read/return password
    //! Without this, password will be undefined and we will not be able to compare it with the password entered by the user, hence bcrypt will throw error

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // const hash = crypto.createHash("sha256").update(password).digest("hex");

    // if (user.password !== hash) {
    //   return res.status(400).json({
    //     message: "Invalid Credentials",
    //   });
    // }

    //* We can do both in a single line

    //! With using select:false in model, password will be undefined so we have by forcing system to read/return password using "+password" in findOne
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
      return res.status(400).json({
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
  } catch (err) {
    console.error("Error Login in User", err);
  }
}

module.exports = {
  registerController,
  loginController,
};
