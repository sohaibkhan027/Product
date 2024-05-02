const pool = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const User = {
  async createUser(name, email, phone, password,role = 'user') {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashedPassword);
        const [result] = await pool.execute(
          'INSERT INTO users (name, email, phone, password,role) VALUES (?, ?, ?, ?,?)',
          [name, email, phone, hashedPassword,role]
        );
        return result.insertId
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
          // MySQL specific error code for duplicate entry
          if (error.message.includes('email')) {
              throw new Error('Email is already registered');
          } else if (error.message.includes('phone')) {
              throw new Error('Phone number is already registered');
          }
      }
      throw error; // re-throw other errors
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
  },
  async  getUserByPhone(phone) {
    try {
      // Query the database to find a user with the provided phone number
      const query = 'SELECT * FROM users WHERE phone = ?';
      const [rows] = await pool.query(query, [phone]);
      return rows[0]; // Assuming phone is unique, so only one row will be returned
    } catch (error) {
      console.error('Error fetching user by phone:', error);
      throw new Error('Error fetching user by phone');
    }
  },
  
  // async createSuperAdmin(email, password) {
  //   try {
  //     const hashedPassword = await bcrypt.hash(password, saltRounds);
  //     const [existingSuperAdmin] = await pool.execute(
  //       'SELECT * FROM users WHERE role = ? LIMIT 1',
  //       ['superadmin']
  //     );

  //     if (existingSuperAdmin.length > 0) {
  //       throw new Error('Superadmin already exists');
  //     }

  //     const [result] = await pool.execute(
  //       'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
  //       [username, hashedPassword, 'superadmin']
  //     );

  //     return result.insertId;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  
};

module.exports = User;
