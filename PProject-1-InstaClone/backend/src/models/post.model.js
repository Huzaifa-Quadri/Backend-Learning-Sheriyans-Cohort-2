const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Caption is required"],
  },

  imageUrl: {
    type: String,
    required: [true, "ImageUrl is required for creating post"],
  },

  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is Required"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    required: [true, "DateTime is Required of post creation"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
