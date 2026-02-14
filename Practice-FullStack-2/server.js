require("dotenv").config();
const app = require("./src/app");
const connecttoDb = require("./src/config/database");

connecttoDb();
app.listen(3000, () => {
  console.log("Practice Server 2 Started on Port 3000");
});
