require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken") 
const { DataSource } = require("typeorm");

const DataSource1 = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

DataSource1.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/ping", function (req, res, next) {
  res.status(200).json({ message: "pong" });
});

  
app.post('/users', async (req, res) => {
	try {
  const { user_id, password} = req.body;
    
  const hashedPassword = await bcrypt.hash(password, saltRounds);
	await DataSource1.query(
    `
      INSERT INTO users (
        user_id,
        password
      ) VALUES (
        ?,
        ?)
      `,
		[ user_id, hashedPassword]
	); 
    res.status(201).end();
	
  } 
  catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
  });
  app.post('/users', async(req, res) => {
    await DataSource1.query(
		`SELECT *
        FROM users
		`,(err, rows) => {
      res.status(200).json(rows);
	});
});

  const password = 'password'; 
  const saltRounds = 12;
  
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  }
  

  app.listen(3000, () => {
  console.log("Server listening on port 3000");
})


const main = async () => { 
    const hashedPassword = await makeHash(password, saltRounds); 
    console.log(hashedPassword);
  }
  
  main()