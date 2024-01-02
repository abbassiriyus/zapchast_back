const pool = require('../db'); 
const express = require('express');
const router = express.Router();

// Barcha kategoriyalarni olish
router.get('/categories', async (req, res) => {
  try {
    const query = 'SELECT * FROM category';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani olish
router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM category WHERE id = $1';
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
router.post('/categories', async (req, res) => {
  const { big_category_id, title, image } = req.body;

  try {
    const query = 'INSERT INTO category (big_category_id, title, image) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [big_category_id, title, image]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani yangilash
router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { big_category_id, title, image } = req.body;

  try {
    const query = 'UPDATE category SET big_category_id = $1, title = $2, image = $3, time_update = current_timestamp WHERE id = $4 RETURNING *';
    const { rows } = await pool.query(query, [big_category_id, title, image, id]);

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
router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM category WHERE id = $1 RETURNING *';
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