const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});
//* Model is the most important thing
//* we give the schema and the collection name where our data will be stored
const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
