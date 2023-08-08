// require("dotenv").config();

// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const { DataSource } = require('typeorm');

// const app = express();

// const appDataSource = new DataSource({
//     type: process.env.DB_CONNECTION,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// })


// appDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));
    
// app.get("/ping", (req, res) => {
//     res.json({ message : "pong"});
// });

// app.listen(PORT, async () => {
//     await appDataSource
//       .initialize()
//       .then(() => {
//         console.log('Data Source has been initialized!');
//       })
//       .catch((error) => {
//         console.error('Error during Data Source initialization', error);
//       });
  
//     console.log(`Listening to request on port: ${PORT}`);
// });

require("dotenv").config();
// 사용할 library를 미리 불러옴.
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
// DB setting
const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});
myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});
// express server 만들기 시작
const app = express();
app.use(cors());
app.use(morgan("combined"));
app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});