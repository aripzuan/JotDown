import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotesList = ({ userId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/notes/${userId}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.error('Failed to fetch notes:', err));
  }, [userId]);

  const summarizeNote = async (text) => {
  try {
    const res = await axios.post('http://localhost:5000/api/ai/summarize', { text });
    alert('AI Summary:\n\n' + res.data.summary);
    // Optionally save it into state or DB
  } catch (err) {
    alert('Failed to summarize');
    console.error(err);
  }
};

  return (
    <div>
      <h2>🗂️ Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} style={{ marginBottom: '1rem' }}>
              <strong>{note.title}</strong> <br />
              <small>{new Date(note.created_at).toLocaleString()}</small>
              <p>{note.body}</p>
              <p><strong>Category:</strong> {note.category}</p>
              <button onClick={() => summarizeNote(note.body)}>🧠 Summarize with AI</button>
{note.summary && <p><strong>AI Summary:</strong> {note.summary}</p>}
              <p><strong>Tags:</strong> {note.tags?.join(', ')}</p>
              <button onClick={() => handleDelete(note.id)}>🗑 Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((err) => console.error('Failed to delete note:', err));
  }
};

export default NotesList;
