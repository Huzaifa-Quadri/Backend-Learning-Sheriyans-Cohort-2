const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "username is required"],
  },
  password: {
    type: String,
    required: [true, "username is required"],
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/vclk2b3f9/default%20profile%20image.png",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
