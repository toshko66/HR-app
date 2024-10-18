// routes/questionnaireRoutes.js
const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Create a new questionnaire
router.post('/create', async (req, res) => {
  const { title, questions, job_id } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO questionnaires (title, questions, job_id) VALUES ($1, $2, $3) RETURNING *',
      [title, JSON.stringify(questions), job_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
