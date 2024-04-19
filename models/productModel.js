// models/Product.js
const pool = require('../config/db');

class Product {
    static async getAllProducts() {
        const [rows] = await pool.query('SELECT * FROM products');
        // console.log("ye error kha se ha",rows);
        return rows;
    }

    static async getProductById(productId) {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        return rows[0];
    }

    static async addProduct(productData) {
        const { name, description, price, stock, image_path } = productData;
        const query = 'INSERT INTO products (name, description, price, stock, image_path) VALUES (?, ?, ?, ?, ?)';
        const values = [name, description, price, stock, image_path];

        try {
            const [result] = await pool.query(query, values);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }
    static async updateProduct(productId, newData) {
        const { name, description, price, stock, image_path } = newData
        const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image_path = ? WHERE id = ?'
        const values = [name, description, price, stock, image_path, productId]

        try {
            const result = await pool.query(query, values)
            return result[0].affectedRows > 0
        } catch (error) {
            throw error
        }
    }

    static async deleteProduct(productId) {
        const query = 'DELETE FROM products WHERE id = ?'

        try {
            const result = await pool.query(query, [productId])
            return result[0].affectedRows > 0
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Product