import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItems = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {showAlert, note,updateNote } = props;

    return (
        <div className="card col-md-3 m-3 mx-3 my-2 ">
            <div className="card-header">
                {note.title}
            </div>
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <p>{note.description}</p>
                    <footer className="blockquote-footer"><cite title="Source Title">{note.tag}</cite></footer>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); showAlert("Deleted successfully","success")
}}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
                </blockquote>
            </div>
        </div>
    )
}

export default NoteItems