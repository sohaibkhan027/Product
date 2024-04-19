const pool = require('../config/dbconfig');

class User {
  static async getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  }

  static async getOneUser(id){
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    console.log("->>>>>",rows);
    return rows;
  }

  static async getUserByName(name) {
    const [rows] = await pool.query('SELECT * FROM users WHERE name = ?', [name]);
    return rows.length > 0 ? rows[0] : null;
}
  static async addUser(userData) {
    const { name, radio, image_filename } = userData; 
console.log('data:',userData);

    const query = 'INSERT INTO users (name, radio, image_filename) VALUES (?, ?, ?)';
    const values = [name, radio, image_filename];

    try {
      const [result] = await pool.query(query, values);
      return result.insertId;
    } catch (error) {
      throw error;
    }
}
}

module.exports = User;



// CREATE TABLE users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   radio VARCHAR(255) NOT NULL,
//   image_filename VARCHAR(255)
// );
