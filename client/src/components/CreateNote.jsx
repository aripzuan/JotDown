import React, { useState } from 'react';
import axios from 'axios';

const CreateNote = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated tags to array
    const tagsArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      const res = await axios.post('http://localhost:5000/api/notes', {
        user_id: userId,
        title,
        body,
        category,
        tags: tagsArray,
      });

      setStatus('✅ Note saved!');
      setTitle('');
      setBody('');
      setCategory('');
      setTags('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to save note');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Body"
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          cols={50}
        />
        <br /><br />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Ideas">Ideas</option>
          <option value="Other">Other</option>
        </select>
        <br /><br />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <br /><br />

        <button type="submit">Save Note</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default CreateNote;
