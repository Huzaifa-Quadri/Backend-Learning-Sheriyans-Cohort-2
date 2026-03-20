//TODO: Complete this as env import problem - require("dotenv").config(); //Cant use this since require staements can no longer be used and ...
import app from "./src/app.js";

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
