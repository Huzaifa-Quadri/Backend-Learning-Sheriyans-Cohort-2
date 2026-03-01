const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      // type: mongoose.Schema.ObjectId,
      // ref: "users",
      // required: [true, "Follower is required"],
      //* since going with username instead of id
      type: String,
    },

    following: {
      // type: mongoose.Schema.ObjectId,
      // ref: "users",
      // required: [true, "Followee is required"],

      //* since going with username instead of id
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      message: "Status can only be pending, accepted or rejected",
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
