const pool = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const User = {
  async createUser(name, email, phone, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashedPassword);
        const [result] = await pool.execute(
          'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
          [name, email, phone, hashedPassword]
        );
        return result.insertId
    } catch (error) {
      throw error;
    }
  },
  async getUserByEmail(email, password) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ? LIMIT 1',
        [email]
      )
      if (rows.length === 0) {
        return null;
      }

      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return null; 
      }

      return user; 
    } catch (error) {
      throw error
    }
  },

  async getAllUser(){
    try {
      const [rowsData] = await pool.execute('SELECT * FROM users');
      // console.log(rowsData); 
      return rowsData; 
    } catch (error) {
      throw error; 
    }
  }
};

module.exports = User;
