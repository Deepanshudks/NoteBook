import { useState } from "react";
import NoteContext from "./NoteContext";;

const NoteState = (props) => {
  const host = "https://yourbook-c17h.onrender.com"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)
  
   const getnote = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    setNotes(json)
    // console.log(json)
  }

  // Add Note
  const addnote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  

  //Delete Note

    const deleteNote = async (id) => {
      // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = response.json(); 
      console.log(json)
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)

    }

  //Edit Note

    const editNote = async (id, title, description, tag) => {
      // API Call 
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json(); 
      console.log(json)

      let newNotes = JSON.parse(JSON.stringify(notes))

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break; 
        }
      }  
      setNotes(newNotes);
    }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addnote, deleteNote, editNote,getnote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
