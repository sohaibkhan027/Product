const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Authorization middleware
router.get('/protected', AuthController.authorize, (req, res) => {
  const { role } = req.user; // Access the user's role from the decoded JWT token

  if (role === 'admin' || role === 'superadmin') {
    // Only admins have access to this route
    res.json({ message: 'Admin access granted', user: req.user });
  } else {
    res.status(403).json({ error: 'Access denied. You are not authorized to access this route.' });
  }
})


module.exports = router;
