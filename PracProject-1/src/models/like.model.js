const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "PostId is required for creating like"],
      ref: "posts",
    },
    user: {
      type: String,
      required: [true, "User is required for creating like"],
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
