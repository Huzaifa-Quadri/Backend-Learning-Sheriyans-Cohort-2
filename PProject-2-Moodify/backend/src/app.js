const express = require("express");
const path = require("path");
const app = express();
const cookieparser = require("cookie-parser");
app.use(express.static("./public")); //Make the mentioned folder publically available

app.use(cookieparser());
app.use(express.json());

const authRouter = require("./routes/auth.routes");
const songRouter = require("./routes/song.routes");

app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
app.get("/api/test", (req, res) => {
  res.status(200).json({
    message: "Backend is running this is a TEST API",
  });
});
app.get(/^(.*)$/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
