const mongoose = require("mongoose");

async function connecttoDb() {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    console.error("Mongo Db URI not found!");
  }

  try {
    await mongoose.connect(uri);

    console.log("Connected to MongoDb Database");
  } catch (e) {
    console.log("Error connecting to database : ", e);
  }
}

module.exports = connecttoDb;
