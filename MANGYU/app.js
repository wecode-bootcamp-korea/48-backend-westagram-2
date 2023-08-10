require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

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
}).catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extened: false }));
app.use(cors());
app.use(morgan("combined"));

app.get("/ping", function (req, res, next) {
  res.json({ message: "pong", aaa:'aaa'});
});



app.post("/users", async (req, res) => {
	const { user_id, password, email } = req.body;
    
	await DataSource1.query(
		"INSERT INTO mangyu100.users (user_id, password, email) VALUES (?, ?, ?);",
  [ user_id, password, email ]
	); 
      res.status(201).json({ message : "successfully created" });
	});


const bcrypt = require("bcrypt"); 

const password = 'password'; 
const saltRounds = 12; 

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds); 
}
const main = async () => { 
  const hashedPassword = await makeHash(password, saltRounds); 
  console.log(hashedPassword);
}
main()


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

