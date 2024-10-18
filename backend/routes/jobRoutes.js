// routes/jobRoutes.js
const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Create a new job
router.post('/create', async (req, res) => {
  const { title, description, company_id, location } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO jobs (title, description, company_id, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, company_id, location]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
