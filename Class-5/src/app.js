const express = require("express");

const app = express();

app.use(express.json());

notes = [];

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.post("/notes", (req, res) => {
  notes.push(req.body);

  //! Naive way, not used
  //   res.send("Note created Succesfully")

  //* Offical way of sending response with status codes - Offical way
  res.status(201).json({
    //* Response will always be in JSON format
    message: "Notes Created Successfully",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id];

  res.status(204).json({
    //Will not printed since 204 doesnot return anything
    message: "Note Deleted",
  });
});

app.patch("/notes/:id", (req, res) => {
  notes[req.params.id].title = req.body.title;

  res.status(200).json({
    desc: "Title Changed Successfully",
  });
});

module.exports = app;
