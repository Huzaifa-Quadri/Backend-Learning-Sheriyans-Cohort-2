const express = require("express");
const app = express();
const noteModel = require("./models/note.model.js");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

//! We have to leave blank api empty as we will use it for displaying frontend on backend
// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Welcome to notes Api with frontend",
//   });
// });

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  try {
    await noteModel.create({
      title: title,
      description: description,
    });

    res.status(201).json({
      message: "Note Saved Successfully",
    });
  } catch (e) {
    res.send("Error in Saving Data");
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await noteModel.find();

    res.status(200).json({
      message: "Notes : ",
      notes,
    });
  } catch (e) {
    res.send("Error in getting notes");
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
      message: `Note of id : ${id} Deleted Successfully `,
    });
  } catch (e) {
    res.send("Error in deleting note");
  }
});

app.patch("/notes/title/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { title } = req.body;

    await noteModel.findByIdAndUpdate(id, { title });

    res.status(200).json({
      message: `Note's Title of id : ${id} Updated Successfully `,
    });
  } catch (e) {
    res.send("Error in update note's Title");
  }
});

app.patch("/notes/desc/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { description } = req.body;

    await noteModel.findByIdAndUpdate(id, { description });

    res.status(200).json({
      message: `Note' Description of id : ${id} Updated Successfully `,
    });
  } catch (e) {
    res.send("Error in update note's Description");
  }
});

//? WildCard APi - Use to handle api endpoints which we didnt create
app.use("*name", (req, res) => {
  // console.log("Checking current Path with __dirname : ", __dirname);

  //* SendFile needs absolute path to run but it is not good practice and always possible to give absolute path so we will use path module
  // res.sendFile(
  //   "E:\\Sheryians Coding School Cohort BackEnd\\Class-10-FullStack\\backend\\public\\index.html",
  // );

  //? Using __dirname and path.join to make absolute path
  res.sendFile(path.join("__dirname", "..", "/public/index.html"));
});

module.exports = app;
