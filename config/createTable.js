// // createTables.js

// const pool = require('./db'); // Import the database pool

// async function createTables() {
//     try {
//         const connection = await pool.getConnection();
        
//         // Define your table creation queries here
//         const productTable = `
//         CREATE TABLE IF NOT EXISTS products (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             description TEXT,
//             price DECIMAL(10, 2) NOT NULL,
//             stock INT NOT NULL DEFAULT 0,
//             image_path VARCHAR(255), -- Change the data type to match your requirements
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
