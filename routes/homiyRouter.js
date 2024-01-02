const pool = require('../db'); 
const express = require('express');
const { put_file, upload_file, delete_file } = require('../middleware/file_upload');
const router = express.Router();


// Barcha homiy elementlarini olish
router.get('/homiy', async (req, res) => {
  try {
    const query = 'SELECT * FROM homiy';
    const { rows } = await pool.query(query);

    res.json(rows);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Homiy elementini olish
router.get('/homiy/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'SELECT * FROM homiy WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Homiy elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Homiy elementini qo'shish
router.post('/homiy', async (req, res) => {
  const { link } = req.body;
  var image=upload_file(req)
  try {
    const query = 'INSERT INTO homiy (link, image) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [link, image]);

    res.json(rows[0]);
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Homiy elementini yangilash
router.put('/homiy/:id', async (req, res) => {
  const { id } = req.params;
  const { link } = req.body;
  const query2 = 'SELECT * FROM bigcategories WHERE id = $1';
  const result = await pool.query(query2, [id]);
  try {
    var image=put_file(result.rows[0].image,req) 
    const query = 'UPDATE homiy SET link = $1, image = $2, time_update = current_timestamp WHERE id = $3 RETURNING *';
    const { rows } = await pool.query(query, [link, image, id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Homiy elementi topilmadi' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

// Homiy elementini o'chirish
router.delete('/homiy/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM homiy WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    delete_file(rows.image)
    if (rows.length === 0) {
      res.status(404).json({ error: 'Homiy elementi topilmadi' });
    } else {
      res.json({ message: 'Homiy elementi o\'chirildi' });
    }
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({error:error.message });
  }
});

module.exports = router;