// controllers/productController.js
const Product = require('../models/productModel')
const multer = require('multer')
const Joi = require('joi');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './photo')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts()
    console.log("prodcuts", products);
    res.json(products)
  } catch (error) {
    console.error('Error in getAllProducts:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.getProductById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({ error: 'Internal server error' })
  }
};

const addProduct = async (req, res) => {
  const productData = req.body;
  
  try {
    // Define schema for input validation using Joi
    if (!productData.name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!productData.price) {
      return res.status(400).json({ error: 'Price is required' });
    }
    if (!productData.description) {
      return res.status(400).json({ error: 'des is required' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Validate product data against the schema
    // const { error } = schema.validate(productData, { abortEarly: false });
    // if (error) {
    //   // Return validation error message if validation fails
    //   const errorMessage = error.details.map((detail) => detail.message).join(', ');
    //   return res.status(400).json({ error: errorMessage });
    // }

    productData.image_path = req.file.path;

    const productId = await Product.addProduct(productData);
    return res.json({ message: 'Product added successfully', id: productId });
  } catch (error) {
    console.error('Error in addProduct:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  console.log("productid:",productId)
  const newData = req.body;

  console.log("newData",newData)
  try {
    if (!newData.name && !newData.description && !newData.price && !newData.stock && !newData.image_path) {
      return res.status(400).json({ error: 'At least one field is required to update' })
    }
    const updated = await Product.updateProduct(productId, newData)
    if (!updated) {
      return res.status(404).json({ error: 'Product not found or not updated' })
    }
    res.json({ message: 'Product updated successfully' })
  } catch (error) {
    console.error('Error in updateProduct:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id
  try {
    const deleted = await Product.deleteProduct(productId)
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found or not deleted' })
    }
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  addProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  upload
}
