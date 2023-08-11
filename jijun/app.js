require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');
const bcrypt = require('bcrypt');
// const saltRounds = 12;

const PORT = 3000;
const app = express();

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/users/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashPwd = bcrypt.hashSync(password, 12);

  await appDataSource.query(
    `INSERT INTO users (name, email, password) VALUES (?,?,?);`,
    [name, email, hashPwd]
  );
  res.status(201).json({ message: 'userCreated' });
});

app.listen(PORT, async () => {
  await appDataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialize!');
    })
    .catch((error) => {
      console.error('Error during Data Source initialize', error);
    });
  console.log(`Listening to request on port: ${PORT}`);
});
