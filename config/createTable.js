// // createTables.js

// const pool = require('./db'); // Import the database pool

// async function createTables() {
//     try {
//         const connection = await pool.getConnection();
        
//         // Define your table creation queries here
//         const productTable = `
//         CREATE TABLE IF NOT EXISTS users (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255),
//             email VARCHAR(255) UNIQUE NOT NULL,
//             phone VARCHAR(20) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         );
//         `;
        
//         // Execute the queries to create tables
//         await connection.query(productTable);
        
//         // Release the connection
//         connection.release();
        
//         console.log('Tables created successfully');
//     } catch (error) {
//         console.error('Error creating tables:', error);
//     } finally {
//         // Close the pool
//         pool.end();
//     }
// }

// module.exports = createTables
