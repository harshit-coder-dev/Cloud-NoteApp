import React, { useState } from "react";
import NoteContext from "./noteContext";
import PropTypes from "prop-types";


let NoteState = (props) => {
  let host = "http://localhost:5000"
  let notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  let getNotes = async () => {
    //  Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    let json = await response.json();

    console.log(json)
    setNotes(json)
  }

  // Add a note

  let addNote = async (title, description, tag) => {
    //  Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    console.log("adding a new Note")
    let note=await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a note

  let deleteNote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });

    let json = await response.json();
    console.log(json);
    
    console.log("Deleting the node" + id)
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note

  let editNote = async (id, title, description, tag) => {
    // Api call
     let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    let json = await response.json();
    console.log(json);

    let newNotes=JSON.parse(JSON.stringify(notes))

    // Logic to client
    for (let index = 0; index < notes.length; index++) {
      let ele= newNotes[index];
      if (ele._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

NoteState.propTypes = {
  children: PropTypes.object.isRequired,
};

export default NoteState;