const pool = require('../db'); 
const express = require('express');
const { upload_file, delete_file, put_file } = require('../middleware/file_upload');
const router = express.Router();

// Barcha kategoriyalarni olish
router.get('/categories', async (req, res) => {
  try {
    const query = 'SELECT * FROM category';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani olish
router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Kategoriya topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani qo'shish
router.post('/categories', async (req, res) => {
  const { big_category_id, title } = req.body;
  var image=upload_file(req)
  try {
    const query = 'INSERT INTO categories (big_category_id, title, image) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [big_category_id, title, image]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani yangilash
router.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { big_category_id, title } = req.body;
  const query2 = 'SELECT * FROM categories WHERE id = $1';
  const result = await pool.query(query2, [id]);
  try {
    var image=put_file(result.rows[0].image,req) 
    const query = 'UPDATE categories SET big_category_id = $1, title = $2, image = $3, time_update = current_timestamp WHERE id = $4 RETURNING *';
    const { rows } = await pool.query(query, [big_category_id, title, image, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Kategoriya topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Kategoriyani o'chirish
router.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM categories WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    delete_file(rows.image)
    if (rows.length === 0) {
      res.status(404).json({ error: 'Kategoriya topilmadi' });
    } else {
      res.json({ message: 'Kategoriya o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;