const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// Barcha product_xususiyat elementlarini olish
router.get('/product_xususiyat', async (req, res) => {
  try {
    const query = 'SELECT * FROM product_xususiyat';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_xususiyat elementini olish
router.get('/product_xususiyat/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM product_xususiyat WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_xususiyat elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_xususiyat elementini qo'shish
router.post('/product_xususiyat', async (req, res) => {
  const { title, result, order, product_id } = req.body;

  try {
    const query =
      'INSERT INTO product_xususiyat (title, result, "order", product_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await pool.query(query, [title, result, order, product_id]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_xususiyat elementini yangilash
router.put('/product_xususiyat/:id', async (req, res) => {
  const { id } = req.params;
  const { title, result, order, product_id } = req.body;

  try {
    const query =
      'UPDATE product_xususiyat SET title = $1, result = $2, "order" = $3, product_id = $4, time_update = current_timestamp WHERE id = $5 RETURNING *';
    const { rows } = await pool.query(query, [title, result, order, product_id, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_xususiyat elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_xususiyat elementini o'chirish
router.delete('/product_xususiyat/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM product_xususiyat WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_xususiyat elementi topilmadi' });
    } else {
      res.json({ message: 'Product_xususiyat elementi muvaffaqiyatli o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;