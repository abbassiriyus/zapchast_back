const pool = require('../db'); 
const express = require('express');
const router = express.Router();


// Barcha subkategoriyalarni olish
router.get('/subcategories', async (req, res) => {
  try {
    const query = 'SELECT * FROM subcategories';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Subkategoriyani olish
router.get('/subcategories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM subcategories WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Subkategoria topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Subkategoriyani qo'shish
router.post('/subcategories', async (req, res) => {
  const { category_id, title, image } = req.body;

  try {
    const query = 'INSERT INTO subcategories (category_id, title, image) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [category_id, title, image]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Subkategoriyani yangilash
router.put('/subcategories/:id', async (req, res) => {
  const { id } = req.params;
  const { category_id, title, image } = req.body;

  try {
    const query = 'UPDATE subcategories SET category_id = $1, title = $2, image = $3, time_update = current_timestamp WHERE id = $4 RETURNING *';
    const { rows } = await pool.query(query, [category_id, title, image, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Subkategoria topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Subkategoriyani o'chirish
router.delete('/subcategories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM subcategories WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Subkategoria topilmadi' });
    } else {
      res.json({ message: 'Subkategoria ochirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;