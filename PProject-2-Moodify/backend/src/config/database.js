const mongoose = require("mongoose");

function connecttodb() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Mongo Db URL not Found!!");
  }

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDb");
    })
    .catch((err) => {
      console.log("Error Connecting to Db ", err);
    });
}

module.exports = connecttodb;
