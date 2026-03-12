const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: [true, "Token should be unique"],
    },
  },
  {
    timestamps: true,
  },
);
const blackListModel = mongoose.model("blacklist", blacklistSchema);

module.exports = blackListModel;
