import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    // Fetch notes from the server
    axios.get('/api/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleAddNote = () => {
    // Send POST request to add a new note
    axios.post('/api/notes', newNote)
      .then(response => {
        setNotes([...notes, response.data]);
        setNewNote({ title: '', content: '' });
      })
      .catch(error => console.error('Error adding note:', error));
  };

  return (
    <div>
      <h1>Notes App</h1>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <strong>{note.title}</strong>: {note.content}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={newNote.title}
        onChange={handleInputChange}
      />
      <textarea
        placeholder="Content"
        name="content"
        value={newNote.content}
        onChange={handleInputChange}
      ></textarea>
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default App;
