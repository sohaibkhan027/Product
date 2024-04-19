// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/allproduct', productController.getAllProducts);
router.get('/oneproduct/:id', productController.getProductById);
router.post('/addproduct', productController.upload.single('filename'),productController.addProduct)
router.put('/updateproduct/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);


module.exports = router
