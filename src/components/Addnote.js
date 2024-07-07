import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';


const Addnote = (props) => {

  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "" })

  const submit = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    props.showAlert("Note added successfully","success")

  }

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className='my-3' >
        <div className="my-3 form-group ">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} placeholder=" Title" />
        </div>
        <div className="my-3 form-group">
          <label htmlFor="description">Description</label>
          {/* <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Description" /> */}
          <textarea className="form-control" id="description" name='description' onChange={onChange} placeholder=" Description" ></textarea>
        </div>
        <div className="my-3 form-group">
          <label htmlFor="tag">tag</label>
          <input type="text" className="form-control" name='tag' id="tag" onChange={onChange} placeholder="Enter a tag" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit}>Add note</button>
      </form>
    </div>
  )
}

export default Addnote