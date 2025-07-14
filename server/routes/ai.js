const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/summarise', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that summarizes notes.' },
        { role: 'user', content: `Summarize this note in 1-2 sentences:\n\n${text}` },
      ],
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

module.exports = router;
