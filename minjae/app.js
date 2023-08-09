require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");
const port = 3000;

const app = express();

const mySqlDataSource = new DataSource({
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
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/users", async (req, res) => {
  const { id, pwd, name, phone, email, guest_yn } = req.body;

  await mySqlDataSource.query(
    "INSERT INTO westagram.users (user_id, password, name, phone, email, guest_yn) VALUES (?, ?, ?, ?, ?, ?);",
    [id, pwd, name, phone, email, guest_yn]
  );
  res.status(201).json({ message: "successfully created" });
});

app.listen(port, async () => {
  await mySqlDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", error);
    });

  console.log(`Listening to request on port: ${port}`);
});
