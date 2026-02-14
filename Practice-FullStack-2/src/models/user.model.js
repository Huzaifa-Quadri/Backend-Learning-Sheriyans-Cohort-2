const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: String,
  email: String,
  // password : [
  //   unique,

  // ]
  password: String,
});

const userModel = mongoose.model("users", userModel);

module.exports = userModel;
