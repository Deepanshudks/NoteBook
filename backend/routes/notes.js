const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');
const Note = require("../models/Notes");

//ROUTE 1:  Fetching a notes using: Get "/api/notes/fetchallnotes",login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//ROUTE 2  Adding a notes using: Post "/api/notes/addnote", login required
router.post("/addnote", fetchUser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body('description', 'description must be atleast five characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array })
        }
        const { description, title, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await note.save();
        res.json(saveNotes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error ")
    }
})
//ROUTE 3:  Update an existing note using: Get "/api/notes/updatenote",login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
    try {
        const { description, title, tag } = req.body;

        // Create new note
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be Updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error ")
    }
})

//ROUTE 4:  Delete an existing note using: DELETE "/api/notes/deletenote",login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        // Allow deletion only for user
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error ")
    }
})

module.exports = router;