const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');




// Route-1 : Get all the notes of user who logged in using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    // req.user.id will be from fetchuser

    try {
        let notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// Route-2 : add a note using: POST "/api/notes/addnote". Login required


router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // we have to use login validator here so that khaali user cant enter the data in notes

    try {
        let { title, description, tag } = req.body;

        // If there are errors , return cad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // if there is no error we will add new notes

        let note = new Note({
            title, description, tag, user: req.user.id
        })

        // here all the notes will be save to body of json
        let savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
});


// Route-3 : UPDATE an existing note using: PUT "/api/notes/updatenote". Login required

// we can update notes of himself not others 

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    // req.body is used to bring all the details of title ,dec,tag
    let { title, description, tag } = req.body;

    try {
        // Create a new note ObjectId
        let newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        // Find the note to ne updated and update it 

        let note = await Note.findById(req.params.id);

        // if id of user that is going to update is not find
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // note.user.toString() it will give present user id 
        // if user going to acesss others notes
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
});


// Route-4 : Delete an existing note using: DELETE "/api/notes/deletenote". Login required


router.delete('/deletenote/:id', fetchuser, async (req, res) => {


    try {
        // Find the note to ne deleted and delete it 

        let note = await Note.findById(req.params.id);

        // if id of user that is going to update is not find
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // note.user.toString() it will give present user id 
        // allow deletion if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has neen deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }

});

module.exports = router;