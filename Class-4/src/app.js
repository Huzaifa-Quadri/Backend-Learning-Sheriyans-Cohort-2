const express = require("express");

const app = express(); // Server is created

app.use(express.json()); // Middleware to handle JSON data

const notes = [];

app.get("/", (req, res) => {
  res.send("Welcome to Notes API");
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.send("Note Created");
  console.log("Here are Notes:\n", notes);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:index", (req, res) => {
  //   notes.splice(req.params.index, 1);
  notes[req.params.index] = null; // Soft Delete
  res.send("Note Deleted on " + req.params.index);
});

app.patch("/notes/:index", (req, res) => {
  // notes[req.params.index].description = "This is the updated description"; //static assign of data
  notes[req.params.index].description = req.body.description; //dynamic value assignment
  res.send("Description Changed");
});

// ..all code before this
module.exports = app; // Exporting the server instance
