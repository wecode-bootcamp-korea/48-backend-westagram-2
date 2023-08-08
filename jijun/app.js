// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgann');
// const { DataSource } = require('typeorm');

// const app = express();

// const appDataSource = new DataSource({
//   type: process.env.DB_CONNECTION,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// app.DataSource.initialize().then(() => {
//   console.log('Data Source has been initialize!');
// });

// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));

// app.get('/ping', (req, res) => {
//   res.json({ message: 'pong' });
// });

// app.listen(3000, async () => {
//   await appDataSource
//     .initialize()
//     .then(() => {
//       console.log('Data Source has been initialize!');
//     })
//     .catch((error) => {
//       console.error('Error during Data Source initialize', error);
//     });
//   console.log('Listening to request on port: ${PORT}');
// });
