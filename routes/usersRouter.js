const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const jwt=require('jsonwebtoken')

router.post('/send-email', async (req, res) => {
  const { email } = req.body;

  try {
    // PostgreSQL veritabanından kullanıcıyı sorgula
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const user = result.rows[0];
    const {  password } = user;
    // E-posta gönderme işlemini gerçekleştirin
    sendEmail(email,password);

    res.sendStatus(200);
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.sendStatus(500);
  }
});




router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // add some basic validation
    if (!name || !email || !password) throw new Error('All fields are required.');

    const hashedPassword = password
    const user = {
      name: name,
      email: email,
      password: hashedPassword
    }
    const jwtToken = jwt.sign(user, SECRET);

    var { rows }=await pool.query('INSERT INTO users (email,password,name,token) VALUES ($1, $2, $3, $4 ) RETURNING *', [email, hashedPassword, name, jwtToken]);
    console.log(rows);
    res.json({ token: jwtToken, data:rows});
    // const newEntry = await pool.query(
    //   'INSERT INTO janr (cinema_id, title) VALUES ($1, $2) RETURNING *',
    //   [cinema_id, title]
    // );
    // res.json(newEntry.rows[0]);
  } catch (err) {
    // set status code to 400 for client errors and provide error message
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // add some basic validation
    if (!email || !password) throw new Error('Email and password are required.');

    // Get user from the database
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userRes.rows[0];

    // Check if User exists
    if (!user) {
      return res.status(400).json({ error: 'User does not exist.' })
    }

    // Compare passwords
    // const passwordMatch = await bcrypt.compare(password,);
    if (password != user.password) {
      return res.status(400).json({ error: 'Incorrect password.' });
    }

    // Create token with API secret
    const jwtToken = jwt.sign({ id: user.id, name: user.name, email: email },"SECRET", { expiresIn: '1h' });
   

    // Send back the token
    res.status(200).json({ token: jwtToken, message: 'You have successfully logged in!' });

  } catch (err) {
    // set status code to 400 for client errors and provide error message
    res.status(400).json({ error: err.message });
  }
});
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