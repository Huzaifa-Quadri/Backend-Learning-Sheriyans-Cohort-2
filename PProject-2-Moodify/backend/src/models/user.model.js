const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Cant continue without a username"],
    unique: [true, "Username should be true for all users"],
  },
  email: {
    type: String,
    required: [true, "Email is mandatory for all users"],
    unique: [true, "Email should be unique for all users"],
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"],
    select: false,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
