require("dotenv").config();
const app = require("./src/app.js");
const connecttoDb = require("./src/config/database.js");

connecttoDb();

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
