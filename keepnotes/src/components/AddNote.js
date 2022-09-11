import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    let context = useContext(noteContext);
    // addNote come from context
    let { addNote } = context;

    let [note, setNote] = useState({ title: "", description: "", tag: "" })

    let handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }

    let onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} minLength={5} value={note.title} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onchange} minLength={5} value={note.description} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} minLength={5} value={note.tag} required/>
                    </div>
                    <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
