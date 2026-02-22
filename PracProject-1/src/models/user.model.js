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

  //* If we want to give following and followers feature then our primary approach will be saving followers id in follower array of object and following in following array of object

  //? It will do the work but on a higher level will increase the size insanely higher

  //! To solve this, we use ; Edge Collection - Establish relationship between two documents
  // followers : [{
  //   type : mongoose.Schema.Types.ObjectId,
  //   ref : "users"
  // }],

  // following : [{
  //   type : mongoose.Schema.Types.ObjectId,
  //   ref : "users"
  // }]
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
