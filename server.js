
const express = require('express');
const cors = require('cors')

const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoute');
// require('dotenv').config();

// const createTables = require('./config/createTable');

app.use(cors())


const PORT =  8000;

app.use(express.json())
app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/product', productRoutes);

// createTables()
//     .then(() => {
//         console.log('Table creation completed');
//     })
//     .catch(error => {
//         console.error('Error creating tables:', error);
//     });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
