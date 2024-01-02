const express = require('express');
const router = express.Router();
const pool = require('../db'); 


// Barcha tavfsif_product elementlarini olish
router.get('/tavfsif_product', async (req, res) => {
  try {
    const query = 'SELECT * FROM tavfsif_product';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Tavfsif_product elementini olish
router.get('/tavfsif_product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM tavfsif_product WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Tavfsif_product elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Tavfsif_product elementini qo'shish
router.post('/tavfsif_product', async (req, res) => {
  const { tavfsif_id, product_id } = req.body;

  try {
    const query =
      'INSERT INTO tavfsif_product (tavfsif_id, product_id) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [tavfsif_id, product_id]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Tavfsif_product elementini yangilash
router.put('/tavfsif_product/:id', async (req, res) => {
  const { id } = req.params;
  const { tavfsif_id, product_id } = req.body;

  try {
    const query =
      'UPDATE tavfsif_product SET tavfsif_id = $1, product_id = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [tavfsif_id, product_id, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Tavfsif_product elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Tavfsif_product elementini o'chirish
router.delete('/tavfsif_product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM tavfsif_product WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Tavfsif_product elementi topilmadi' });
    } else {
      res.json({ message: 'Tavfsif_product elementi o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;