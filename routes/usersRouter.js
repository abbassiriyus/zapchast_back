const express = require('express');
const router = express.Router();
const pool = require('../db.js');



// Hamma foydalanuvchilarni olish
router.get('/users', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Foydalanuvchini olish
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Foydalanuvchini qo'shish
router.post('/users', async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const query = 'INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [name, password, email]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Foydalanuvchini yangilash
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, password, email } = req.body;

  try {
    const query = 'UPDATE users SET name = $1, password = $2, email = $3, time_update = current_timestamp WHERE id = $4 RETURNING *';
    const { rows } = await pool.query(query, [name, password, email, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Foydalanuvchini o'chirish
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Foydalanuvchi topilmadi' });
    } else {
      res.json({ message: 'Foydalanuvchi o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;