import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    let context = useContext(noteContext);
    // addNote come from context
    let navigate=useNavigate();
    let { notes, getNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){

            getNotes();
        }else{
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])

    let [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    let ref = useRef(null)
    let updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        props.showAlert("Updated Successfully","Success");
    }

    let refClose = useRef(null)
    let handleSubmit = () => {
        console.log("Updating the Note...", note)
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
    }
    let onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote  showAlert={props.showAlert}/>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onchange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={note.etag} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={note.etitle.length<5 || note.edescription.length<5} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" container row my-3">
                <h1>Your Notes</h1>
                <div className="container">
                {notes.length===0 && "No notes to display"}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>
    )
}

Notes.propTypes = {
    showAlert: PropTypes.func
};