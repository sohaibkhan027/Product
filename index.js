// const express = require('express')
// const mysql = require('mysql')
// const cors = require('cors')
// const PORT = 8081


// const app = express()
// app.use(cors())
// app.use(express.json())


// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'form'
// })

// // db.connect(function(err) {
// //     if (err) throw err;
// //     console.log("Connected!");
// //     var sql = "CREATE TABLE products (name VARCHAR(255), lastName VARCHAR(255))";
// //     db.query(sql, function (err, result) {
// //       if (err) throw err;
// //       console.log("Table created");
// //     });
// //   });


// app.post('/productform',(req,res)=>{
//     const sql = "INSERT INTO products (`name`,  `lastName` ) Values (?)"
//     const values = [
        
//         req.body.name,
//         req.body.lastName
//     ]

//     db.query(sql,[values],(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })


// })
// app.get("/",(req,res)=>{
//     res.send("hello")
// console.log("hello server");
// })

// app.listen(PORT,()=>{
//     console.log("server is running");
// })