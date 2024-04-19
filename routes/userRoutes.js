const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
// const { getAllUsers, addUser } = require('../controllers/userController');

router.get('/users',userController.getAllUsers);
router.get('/user/:id',userController.getOneUser);
router.post('/users', userController.upload.single('filename'),userController.addUser)

module.exports = router