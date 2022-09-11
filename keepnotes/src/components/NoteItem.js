import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import PropTypes from "prop-types";

const NoteItem = (props) => {
    let context = useContext(noteContext);
    let { note, updateNote } = props;
    let { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center ">
                        <h5 className="card-title mx-2">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-4" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square mx-4" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    updateNote: PropTypes.func.isRequired,
};

export default NoteItem

