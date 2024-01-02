const express = require('express');
const router = express.Router();
const pool = require('../db'); 
// Barcha product_sharx elementlarini olish
router.get('/product_sharx', async (req, res) => {
  try {
    const query = 'SELECT * FROM product_sharx';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_sharx elementini olish
router.get('/product_sharx/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM product_sharx WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_sharx elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_sharx elementini qo'shish
router.post('/product_sharx', async (req, res) => {
  const { name, email, pros, minuslar, korib_chiqish, mark, product_id } = req.body;

  try {
    const query =
      'INSERT INTO product_sharx (name, email, pros, minuslar, korib_chiqish, mark, product_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const { rows } = await pool.query(query, [name, email, pros, minuslar, korib_chiqish, mark, product_id]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_sharx elementini yangilash
router.put('/product_sharx/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, pros, minuslar, korib_chiqish, mark, product_id } = req.body;

  try {
    const query =
      'UPDATE product_sharx SET name = $1, email = $2, pros = $3, minuslar = $4, korib_chiqish = $5, mark = $6, product_id = $7, time_update = current_timestamp WHERE id = $8 RETURNING *';
    const { rows } = await pool.query(query, [
      name,
      email,
      pros,
      minuslar,
      korib_chiqish,
      mark,
      product_id,
      id,
    ]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_sharx elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_sharx elementini o'chirish
router.delete('/product_sharx/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM product_sharx WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_sharx elementi topilmadi' });
    } else {
      res.json({ message: 'Product_sharx elementi muvaffaqiyatli o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:',error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;