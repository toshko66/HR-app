// routes/cvRoutes.js
const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Upload a CV
router.post('/upload', async (req, res) => {
  const { user_id, job_id, cv_content } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO cvs (user_id, job_id, cv_content) VALUES ($1, $2, $3) RETURNING *',
      [user_id, job_id, cv_content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
