const mongoose = require("mongoose");

async function connecttoDb() {
  try {
    const uri = process.env.MongoDB_URL;
    console.log(uri);

    if (!uri) {
      throw new Error("MongoDB_URL environment variable is not set");
    }
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Error Connecting to MongoDB Server : ", e);
  }
}

module.exports = connecttoDb;
