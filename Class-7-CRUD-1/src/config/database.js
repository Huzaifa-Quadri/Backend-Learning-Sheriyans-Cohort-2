const mongoose = require("mongoose");

function connecttoDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
}

module.exports = connecttoDb;
