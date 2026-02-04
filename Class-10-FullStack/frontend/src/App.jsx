import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useEffect } from "react";
import { Trash } from "lucide-react";
const App = () => {
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    const Notes = axios.get("http://localhost:3000/notes").then((res) => {
      // console.log("Got Notes : ", res);
      setnotes(res.data.notes);
    });
    // console.log("Here are notes", Notes);
  }

  function submitHandler(e) {
    e.preventDefault();

    const { title, desc } = e.target.elements;
    console.log(title.value, desc.value);

    axios
      .post("http://localhost:3000/notes", {
        title: title.value,
        description: desc.value,
      })
      .then((res) => {
        console.log(res.data);

        fetchNotes();
      });
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/notes/${id}`).then((res) => {
      console.log(res.data);

      fetchNotes();
    });
  }

  function handleUpdate() {}

  return (
    <div className="container">
      <h1>Notes</h1>
      <form className="note-create-form" onSubmit={submitHandler}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="desc" type="text" placeholder="Enter Description" />
        <button type="submit">Submit</button>
      </form>
      <div className="notes-section">
        {notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handleDelete(note._id);
                }}
              >
                <Trash />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
