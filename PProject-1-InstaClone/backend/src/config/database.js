const mongoose = require("mongoose");

async function connecttoDb() {
  const url = process.env.MONGO_URI;

  if (!url) {
    return console.error("MongoDB_URL environment variable is not set");
  }

  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (err) {
    return console.error("Error Connecting Database\n\n", err);
  }
}

module.exports = connecttoDb;
