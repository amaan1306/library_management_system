const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Routes
app.post('/api/login', (req, res) => {
  const { userId, password, role } = req.body;
  const table = role === 'admin' ? 'admins' : 'users';

  db.query(`SELECT * FROM ${table} WHERE username = ? AND password = ?`, [userId, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.json({ success: true, redirect: role === 'admin' ? 'admin_home.html' : 'user_home.html' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Serve static files (e.g., HTML pages)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
