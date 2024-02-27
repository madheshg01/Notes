const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a note by ID
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    const deletedNote = await note.remove();
    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


module.exports = router;