const app = require("./src/app.js");
const mongoose = require("mongoose");

function connectToDb() {
  //after the connection string, after '/' if we write some string, it create a new database with this string as name.
  mongoose
    .connect(
      "mongodb+srv://huzaifaquadri1853_db_user:0K2mHwVprhYn0iL2@cluster0.3tgqvcp.mongodb.net/Class-6",
    )
    .then(() => {
      console.log("Connected to Database");
    });
}

connectToDb();

app.listen(3000, () => {
  console.log("Server Started on Port 3000 h");
});
