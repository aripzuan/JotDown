const express = require('express');
const router = express.Router();
const pool = require('../db'); // ✅ Use shared pool from db.js

// GET all notes for a user
router.get('/:uid', async (req, res) => {
  const { uid } = req.params;
  const result = await pool.query(
    'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
    [uid]
  );
  res.json(result.rows);
});

// POST create a note
router.post('/', async (req, res) => {
  const { user_id, title, body, category, tags } = req.body;

  const result = await pool.query(
    'INSERT INTO notes (user_id, title, body, category, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [user_id, title, body, category, tags]
  );

  res.json(result.rows[0]);
});

// DELETE a note by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM notes WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;
