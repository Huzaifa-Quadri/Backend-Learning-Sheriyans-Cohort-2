const express = require("express");
const authRouter = require("./auth/auth.routes");
const courceModel = require("./models/cource.model");
const cookieparser = require("cookie-parser");
const authMiddleware = require("./auth/auth.middleware");
const app = express();

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRouter);

app.post("/createCource", authMiddleware, (req, res) => {
  const { no, name, description, subjects, duration, level, price } = req.body;

  try {
    const cource = courceModel.create({
      no,
      name,
      description,
      subjects,
      duration,
      level,
      price,
    });

    res.status(200).json({
      message: "Cource Created Succefully",
      cource,
    });
  } catch (e) {
    res.status(401).json({
      message: "Error Creating Cource",
      e,
    });
  }
});

app.delete("/remove/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await courceModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Cource not found",
      });
    }

    res.status(200).json({
      message: `Cource Deleted Successfully`,
      deleted,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error in Deleting Cource",
      err,
    });
  }
});

app.get("/getCources", authMiddleware, async (req, res) => {
  const cources = await courceModel.find();

  res.status(200).json({
    message: "Here are all Cources",
    cources,
  });
});

module.exports = app;
