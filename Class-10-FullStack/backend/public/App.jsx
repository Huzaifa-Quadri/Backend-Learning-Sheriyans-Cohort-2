import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useEffect } from "react";
import { Trash } from "lucide-react";
import { SquarePen } from "lucide-react";

const App = () => {
  const [notes, setnotes] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [currentUpdateNoteId, setcurrentUpdateNoteId] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    const Notes = axios.get("/notes").then((res) => {
      // console.log("FULL RESPONSE:\n\n\n", res.data);
      setnotes(
        res.data.notes || [
          {
            title: "Sample Note",
            description:
              "Sample Description when data is Empty OR Not Comming from Server",
          },
        ],
      );
    });
    // console.log("Here are notes", Notes);
  }

  function submitHandler(e) {
    e.preventDefault();

    const { title, desc } = e.target.elements;
    console.log(title.value, desc.value);

    axios
      .post("/notes", {
        title: title.value,
        description: desc.value,
      })
      .then((res) => {
        console.log(res.data);

        fetchNotes();
        setTitle("");
        setDesc("");
      });
  }

  function handleDelete(id) {
    axios.delete(`/notes/${id}`).then((res) => {
      console.log(res.data);

      fetchNotes();
    });
  }

  function handleUpdate(noteId) {
    console.log("Note Id to update of :", currentUpdateNoteId);

    if (editTitle.length != 0 && editDesc.length == 0) {
      axios
        .patch(`/notes/title/${noteId}`, {
          title: `${editTitle}`,
        })
        .then((res) => {
          console.log(res);
        });
    } else if (editTitle.length === 0 && editDesc.length != 0) {
      axios
        .patch(`/notes/desc/${noteId}`, {
          description: `${editDesc}`,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      alert("Cannot Edit both, Create a New Note");
    }

    setEditTitle("");
    setEditDesc("");
    fetchNotes();
    setShowModal(false);
    setcurrentUpdateNoteId("");
  }

  return (
    <div className="container">
      <h1>Notes</h1>
      <div className="create-note">
        <h2>Create a New Note Here</h2>
        <form className="note-create-form" onSubmit={submitHandler}>
          <input
            name="title"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            name="desc"
            type="text"
            placeholder="Enter Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="notes-section">
        {/* <h2>All Notes Here</h2> */}

        {notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <div className="buttons">
                <button
                  id="delete"
                  onClick={() => {
                    handleDelete(note._id);
                  }}
                >
                  <Trash />
                </button>

                <button
                  id="edit"
                  onClick={() => {
                    setcurrentUpdateNoteId(note._id);
                    setShowModal(true);
                  }}
                >
                  <SquarePen />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Edit Note</h2>

            <input
              type="text"
              placeholder="New Title (leave blank if dont want to change)"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="New Description (leave blank if dont want to change)"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />

            <div className="modal-actions">
              <button id="cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                id="submit"
                onClick={() => {
                  console.log(editTitle, editDesc);
                  handleUpdate(currentUpdateNoteId);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
