const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('../controllers/signupController');
// const LoginController = require('../controllers/authController');
const upload = multer();

// Signup route
router.post('/signup',upload.none(), UserController.createUser);
router.post('/login', upload.none(), UserController.login);
router.get('/getusers', UserController.getAllUser);


module.exports = router;
