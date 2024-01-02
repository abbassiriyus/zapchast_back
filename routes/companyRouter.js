const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// Get all companies
router.get('/company', async (req, res) => {
  try {
    const query = 'SELECT * FROM company';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message});
  }
});

// Get a specific company
router.get('/company/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM company WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message});
  }
});

// Create a new company
router.post('/company', async (req, res) => {
  const { phone1, phone2, image, worktime1, worktime2, address, email } = req.body;

  try {
    const query =
      'INSERT INTO company (phone1, phone2, image, worktime1, worktime2, address, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const { rows } = await pool.query(query, [phone1, phone2, image, worktime1, worktime2, address, email]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message});
  }
});

// Update a company
router.put('/company/:id', async (req, res) => {
  const { id } = req.params;
  const { phone1, phone2, image, worktime1, worktime2, address, email } = req.body;

  try {
    const query =
      'UPDATE company SET phone1 = $1, phone2 = $2, image = $3, worktime1 = $4, worktime2 = $5, address = $6, email = $7, time_update = current_timestamp WHERE id = $8 RETURNING *';
    const { rows } = await pool.query(query, [phone1, phone2, image, worktime1, worktime2, address, email, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message});
  }
});

// Delete a company
router.delete('/company/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM company WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Company not found' });
    } else {
      res.json({ message: 'Company deleted successfully' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message});
  }
});

module.exports = router;