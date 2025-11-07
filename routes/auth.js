const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// In a real application, you would store this in a database
const ADMIN_CREDENTIALS = {
  username: 'beratmen',
  password: '$2b$10$zF8wIPZe1SqVo299GEsDWu0ul7ty2epCz0iU7ibZxmna36MKXAUVe'
};

// Login process
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide both username and password' });
    }

    if (username === ADMIN_CREDENTIALS.username) {
      const match = await bcrypt.compare(password, ADMIN_CREDENTIALS.password);
      if (match) {
        req.session.isAuthenticated = true;
        return res.json({ success: true });
      }
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Check auth status
router.get('/status', (req, res) => {
  res.json({ isAuthenticated: !!req.session.isAuthenticated });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
 