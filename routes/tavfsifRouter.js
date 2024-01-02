const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// Barcha tavfsif elementlarini olish
router.get('/tavfsif', async (req, res) => {
  try {
    const query = 'SELECT * FROM tavfsif';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Tavfsif elementini olish
router.get('/tavfsif/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM tavfsif WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Tavfsif elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Tavfsif elementini qo'shish
router.post('/tavfsif', async (req, res) => {
  const { title, image, desc } = req.body;

  try {
    const query =
      'INSERT INTO tavfsif (title, image, desc) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [title, image, desc]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Tavfsif elementini yangilash
router.put('/tavfsif/:id', async (req, res) => {
  const { id } = req.params;
  const { title, image, desc } = req.body;

  try {
    const query =
      'UPDATE tavfsif SET title = $1, image = $2, desc = $3, time_update = current_timestamp WHERE id = $4 RETURNING *';
    const { rows } = await pool.query(query, [title, image, desc, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Tavfsif elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Tavfsif elementini o'chirish
router.delete('/tavfsif/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM tavfsif WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Tavfsif elementi topilmadi' });
    } else {
      res.json({ message: 'Tavfsif elementi o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;