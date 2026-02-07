const mongoose = require("mongoose");

async function connecttoDb() {
  const uri = process.env.MongodbUrl;

  if (!uri) {
    throw new Error("MongoDB_URL environment variable is not set");
  }
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  try {
  } catch (e) {
    console.log("Error in COnnecting to database : \n\n", e);
  }
}

module.exports = connecttoDb;
