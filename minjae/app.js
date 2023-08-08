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
app.use(express.urlencoded({ extended: false })); //extended: false : querystring 모듈 사용해 쿼리스트링 해석
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/books", async (req, res) => {
  await myDataSource.query(
    `SELECT 
          books.id,
          books.title,
          books.description,
          books.cover_image,
          authors.first_name,
          authors.last_name,
          authors.age
      FROM dbmate.books_authors ba
      INNER JOIN authors ON ba.author_id = authors.id 
      INNER JOIN books ON ba.book_id = books.id`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

app.put("/books", async (req, res) => {
  const { title, description, coverImage, bookId } = req.body;

  await myDataSource.query(
    `UPDATE dbmate.books
			SET 
				title = ?,
				description = ?,
				cover_image = ?
				WHERE id = ?
		`,
    [title, description, coverImage, bookId]
  );
  res.status(201).json({ message: "successfully updated" });
});

app.post("/books", async (req, res) => {
  const { title, description, coverImage } = req.body;

  await mySqlDataSource.query(
    "INSERT INTO dbmate.books (title, description, coverImage) VALUES (?, ?, ?);",
    [title, description, coverImage]
  );
  res.status(201).json({ message: "successfully created" });
});

app.delete("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;

  await myDataSource.query(
    `DELETE FROM dbmate.books
		WHERE books.id = ${bookId}
		`
  );
  res.status(204).json({ message: "successfully deleted" });
});

app.post("/authors", async (req, res) => {
  const { first_name, last_name, age } = req.body;

  await mySqlDataSource.query(
    "INSERT INTO dbmate.authors (first_name, last_name, age) VALUES (?, ?, ?);",
    [first_name, last_name, age]
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
