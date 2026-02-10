const mongoose = require("mongoose");

const courceSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  subjects: {
    type: [String],
    default: [],
  },

  duration: {
    type: String, // "6 weeks", "40 hours"
  },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },

  price: {
    type: Number,
    default: 0, // free by default
  },
});

const courceModel = mongoose.model("cources", courceSchema);

module.exports = courceModel;
