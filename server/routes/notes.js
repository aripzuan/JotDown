import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/:uid', async (req, res) => {
  const { uid } = req.params;
  const result = await pool.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC', [uid]);
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { user_id, title, body } = req.body;
  const result = await pool.query(
    'INSERT INTO notes (user_id, title, body) VALUES ($1, $2, $3) RETURNING *',
    [user_id, title, body]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM notes WHERE id = $1', [id]);
  res.sendStatus(204);
});

export default router;
