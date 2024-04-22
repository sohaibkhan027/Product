const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Authorization middleware
router.use(AuthController.authorize);

// Protected route example
router.get('/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
