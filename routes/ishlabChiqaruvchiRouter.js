const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// Barcha ishlab chiqaruvchilar elementlarini olish
router.get('/ishlab_chiqaruvchi', async (req, res) => {
  try {
    const query = 'SELECT * FROM ishlab_chiqaruvchi';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Ishlab chiqaruvchi elementini olish
router.get('/ishlab_chiqaruvchi/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM ishlab_chiqaruvchi WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Ishlab chiqaruvchi elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Ishlab chiqaruvchi elementini qo'shish
router.post('/ishlab_chiqaruvchi', async (req, res) => {
  const { title } = req.body;

  try {
    const query = 'INSERT INTO ishlab_chiqaruvchi (title) VALUES ($1) RETURNING *';
    const { rows } = await pool.query(query, [title]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Ishlab chiqaruvchi elementini yangilash
router.put('/ishlab_chiqaruvchi/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const query = 'UPDATE ishlab_chiqaruvchi SET title = $1, time_update = current_timestamp WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, [title, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Ishlab chiqaruvchi elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Ishlab chiqaruvchi elementini o'chirish
router.delete('/ishlab_chiqaruvchi/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM ishlab_chiqaruvchi WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Ishlab chiqaruvchi elementi topilmadi' });
    } else {
      res.json({ message: 'Ishlab chiqaruvchi elementi o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;