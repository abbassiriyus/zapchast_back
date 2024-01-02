const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// Barcha product elementlarini olish
router.get('/product', async (req, res) => {
  try {
    const query = 'SELECT * FROM product';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product elementini olish
router.get('/product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM product WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product elementini qo'shish
router.post('/product', async (req, res) => {
  const {
    title,
    desc,
    look_mor,
    kafolat,
    model,
    image,
    davlat,
    maqola,
    ishlab_chiqaruvchi_id,
    skitka,
    price,
    sotishdan_oldin,
    free_mas,
  } = req.body;

  try {
    const query =
      'INSERT INTO product (title, "desc", look_mor, kafolat, model, image, davlat, maqola, ishlab_chiqaruvchi_id, skitka, price, sotishdan_oldin, free_mas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
    const { rows } = await pool.query(query, [
      title,
      desc,
      look_mor,
      kafolat,
      model,
      image,
      davlat,
      maqola,
      ishlab_chiqaruvchi_id,
      skitka,
      price,
      sotishdan_oldin,
      free_mas,
    ]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product elementini yangilash
router.put('/product/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    desc,
    look_mor,
    kafolat,
    model,
    image,
    davlat,
    maqola,
    ishlab_chiqaruvchi_id,
    skitka,
    price,
    sotishdan_oldin,
    free_mas,
  } = req.body;

  try {
    const query =
      'UPDATE product SET title = $1, "desc" = $2, look_mor = $3, kafolat = $4, model = $5, image = $6, davlat = $7, maqola = $8, ishlab_chiqaruvchi_id = $9, skitka = $10, price = $11, sotishdan_oldin = $12, free_mas = $13, time_update = current_timestamp WHERE id = $14 RETURNING *';
    const { rows } = await pool.query(query, [
      title,
      desc,
      look_mor,
      kafolat,
      model,
      image,
      davlat,
      maqola,
      ishlab_chiqaruvchi_id,
      skitka,
      price,
      sotishdan_oldin,
      free_mas,
      id,
    ]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product elementini o'chirish
router.delete('/product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM product WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product elementi topilmadi' });
    } else {
      res.json({ message: 'Product elementi muvaffaqiyatli o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;