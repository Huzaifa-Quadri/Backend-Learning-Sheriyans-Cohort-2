const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
app.use(cookieparser());
app.use(express.json());

const authRouter = require("./routes/auth.routes");
const songRouter = require("./routes/song.routes");

app.use("/api/auth", authRouter);
app.use("/api/songs", songRouter);
module.exports = app;
