import React, { useState } from "react";
import "./index.css";
import axios from "axios";
const App = () => {
  const [notes, setnotes] = useState([
    {
      title: "local test title 1",
      description: "local test description 1",
    },
    // {
    //   title: "local test title 2",
    //   description: "local test description 2",
    // },
    // {
    //   title: "local test title 3",
    //   description: "local test description 3",
    // },
  ]);

  const Notes = axios.get("http://localhost:3000/notes").then((res) => {
    // console.log("Got Notes : ", res);
    setnotes(res.data.notes);
  });
  // console.log("Here are notes", Notes);

  return (
    <div className="container">
      <h1>Notes</h1>
      {notes.map((note) => {
        return (
          <div className="note">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
