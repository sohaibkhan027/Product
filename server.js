
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoute');
const signupRoute = require('./routes/signupRoute');
const authRoutes = require('./routes/authRoute');


// require('dotenv').config();

// const createTables = require('./config/createTable');

app.use(cors())

const PORT =  8000;

//Middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/', userRoutes);
app.use('/reg', signupRoute);
app.use('/product', productRoutes);
app.use('/api', authRoutes)



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
