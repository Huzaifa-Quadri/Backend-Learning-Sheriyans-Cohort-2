const express = require("express");

const app = express();

//* we have to write this this to make server capable to handle json data
app.use(express.json());

const notes = [
  // {
  //     title: "Note 1",
  //     description: "Content of Note 1"
  // },
  // {
  //     title: "Note 2",
  //     description: "Content of Note 2"
  // }
];

app.post("/notes", (req, res) => {
  //client side or frontend side se saara data req se handle

  res.send("Note Created");

  notes.push(req.body);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
