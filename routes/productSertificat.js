const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const { upload_file, put_file, delete_file } = require('../middleware/file_upload');

// Barcha product_sertificat elementlarini olish
router.get('/product_sertificat', async (req, res) => {
  try {
    const query = 'SELECT * FROM product_sertificat';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_sertificat elementini olish
router.get('/product_sertificat/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM product_sertificat WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_sertificat elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_sertificat elementini qo'shish
router.post('/product_sertificat', async (req, res) => {
  const {  product_id } = req.body;
  var image=upload_file(req)
  try {
    const query =
      'INSERT INTO product_sertificat (image, product_id) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [image, product_id]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_sertificat elementini yangilash
router.put('/product_sertificat/:id', async (req, res) => {
  const { id } = req.params;
  const {  product_id } = req.body;
  const query2 = 'SELECT * FROM product_sertificat WHERE id = $1';
  const result = await pool.query(query2, [id]);
  try {

    var image=put_file(result.rows[0].image,req) 
    const query =
      'UPDATE product_sertificat SET image = $1, product_id = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [image, product_id, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_sertificat elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Product_sertificat elementini o'chirish
router.delete('/product_sertificat/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM product_sertificat WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    delete_file(rows[0].image)
    if (rows.length === 0) {
      res.status(404).json({ error: 'Product_sertificat elementi topilmadi' });
    } else {
      res.json({ message: 'Product_sertificat elementi muvaffaqiyatli o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:',error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;