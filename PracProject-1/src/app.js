const express = require("express");
const cookieparser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieparser());

const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.get("/home", (req, res) => {
  res.status(200).json({
    message: "Welcome to My Practice Project",
  });
});

module.exports = app;
