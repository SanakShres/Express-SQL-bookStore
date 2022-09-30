import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SQLpassword2022",
  database: "test",
});

// express server middleware/// allows to send any json file as a cliemt
app.use(express.json());
app.use(cors());

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SQLpassword2022';

app.get("/", (req, res) => {
  res.json("Hello this is backend!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    else return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (error, data) => {
    if (error) return res.json(error);
    else return res.json("Book has been added successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (error, data) => {
    if (error) return res.json(error);
    else return res.json("Book has been deleted successfully");
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "SELECT * FROM books WHERE id = ?";
  db.query(q, [bookId], (error, data) => {
    if (error) return res.json(error);
    else return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (error, data) => {
    if (error) return res.json(error);
    else return res.json("Book has been updated successfully");
  });
});

app.listen(8800, function () {
  console.log("Server started at port 8800");
});
