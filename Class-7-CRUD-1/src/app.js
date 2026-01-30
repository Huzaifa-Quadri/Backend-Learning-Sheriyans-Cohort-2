const express = require("express");
const app = express();
const noteModel = require("./models/notes.model");
app.use(express.json());

// const notes = []; //? Using Db now

app.post("/notes", async (req, res) => {
  //req.body => {title, description}
  const { title, description } = req.body;

  try {
    const note = await noteModel.create({
      title,
      description,
    });

    res.status(201).json({
      message: "note created successfully",
      note,
    });
  } catch (e) {
    console.log("Error while Saving saving data in database", e);
  }
});

app.get("/notes", async (req, res) => {
  //get method
  //fetch all notes

  try {
    const notes = await noteModel.find(); //find will always return data in array

    res.status(200).json({
      message: "Notes Fetched Successfully",
      notes,
    });
  } catch (e) {
    console.log("Error while Saving saving data in database", e);
  }
});

module.exports = app;
