// Feature: Load environment variables securely from .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Feature: Express middleware configuration for JSON parsing and cross-origin resource sharing
app.use(express.json());
app.use(cors());

// Feature: In-memory dynamic array storage for notes without hardcoded items
let notes = [];

// Feature: GET endpoint to retrieve all current notes from server storage
app.get('/api/notes', (req, res) => res.json(notes));

// Feature: POST endpoint to validate and add a new dynamic note to the array
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'Required fields missing' });
  const newNote = { id: Date.now().toString(), title, content };
  notes.unshift(newNote);
  res.status(201).json(newNote);
});

// Feature: PUT endpoint to update an existing note by its unique ID
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) return res.status(404).json({ error: 'Note not found' });
  notes[index] = { id, title, content };
  res.json(notes[index]);
});

// Feature: DELETE endpoint to remove a note from the array by its ID
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter(n => n.id !== id);
  res.json({ message: 'Deleted successfully' });
});

// Feature: Initialize server port configuration using environment variables or fallback
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));