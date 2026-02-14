const mongoose = require("mongoose");

async function connecttoDb() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    return console.log("Error in Getting Mongo DB URL");
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error Connecting to Database\n\n", err);
  }
}

module.exports = connecttoDb;
