const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const { upload_file, put_file, delete_file } = require('../middleware/file_upload');

// Barcha product_fayllar elementlarini olish
router.get('/product_fayllar', async (req, res) => {
  try {
    const query = 'SELECT * FROM product_fayllar';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_fayllar elementini olish
router.get('/product_fayllar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM product_fayllar WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_fayllar elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_fayllar elementini qo'shish
router.post('/product_fayllar', async (req, res) => {
  const { product_id } = req.body;
  var image=upload_file(req)
  try {
    const query =
      'INSERT INTO product_fayllar (image, product_id) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [image, product_id]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_fayllar elementini yangilash
router.put('/product_fayllar/:id', async (req, res) => {
  const { id } = req.params;
  const { product_id } = req.body;
  const query2 = 'SELECT * FROM product_fayllar WHERE id = $1';
  const result = await pool.query(query2, [id]);
  try {
    var image=put_file(result.rows[0].image,req) 
    const query =
      'UPDATE product_fayllar SET image = $1, product_id = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [image, product_id, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_fayllar elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_fayllar elementini o'chirish
router.delete('/product_fayllar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM product_fayllar WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    delete_file(rows.image)
    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_fayllar elementi topilmadi' });
    } else {
      res.json({ message: 'Product_fayllar elementi muvaffaqiyatli o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;