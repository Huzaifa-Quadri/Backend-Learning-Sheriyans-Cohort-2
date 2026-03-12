require("dotenv").config();
const connecttodb = require("./src/config/database");
const app = require("./src/app");

connecttodb();

app.listen(3000, () => {
  console.log("Server started on Port 3000 for Moodify");
});
