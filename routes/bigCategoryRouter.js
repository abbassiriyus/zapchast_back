const pool = require('../db'); 
const express = require('express');
const router = express.Router();


// Barcha kattalar ro'yxatini olish
router.get('/bigcategories', async (req, res) => {
  try {
    const query = 'SELECT * FROM bigcategories';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani olish
router.get('/bigcategories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM bigcategories WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Kategoriya topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani qo'shish
router.post('/bigcategories', async (req, res) => {
  const { title, image } = req.body;

  try {
    const query = 'INSERT INTO bigcategories (title, image) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [title, image]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani yangilash
router.put('/bigcategories/:id', async (req, res) => {
  const { id } = req.params;
  const { title, image } = req.body;

  try {
    const query = 'UPDATE bigcategories SET title = $1, image = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [title, image, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Kategoriya topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani o'chirish
router.delete('/bigcategories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM bigcategories WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Kategoriya topilmadi' });
    } else {
      res.json({ message: 'Kategoriya o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;