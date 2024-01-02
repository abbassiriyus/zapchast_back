const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// Barcha product_savol elementlarini olish
router.get('/product_savol', async (req, res) => {
  try {
    const query = 'SELECT * FROM product_savol';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_savol elementini olish
router.get('/product_savol/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM product_savol WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_savol elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_savol elementini qo'shish
router.post('/product_savol', async (req, res) => {
  const { email, name, savol, product_id } = req.body;

  try {
    const query =
      'INSERT INTO product_savol (email, name, savol, product_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await pool.query(query, [email, name, savol, product_id]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_savol elementini yangilash
router.put('/product_savol/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name, savol, product_id } = req.body;

  try {
    const query =
      'UPDATE product_savol SET email = $1, name = $2, savol = $3, product_id = $4, time_update = current_timestamp WHERE id = $5 RETURNING *';
    const { rows } = await pool.query(query, [email, name, savol, product_id, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_savol elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_savol elementini o'chirish
router.delete('/product_savol/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM product_savol WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_savol elementi topilmadi' });
    } else {
      res.json({ message: 'Product_savol elementi muvaffaqiyatli o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:',error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;