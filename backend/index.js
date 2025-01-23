import express from "express";
import mysql from "mysql";
import cors from "cors";

// Initializing the express server
const app = express();

// Initializing the sql database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "salve123159",
  database: "buku",
});

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json("Connected");
});

app.get("/buku", (req, res) => {
  const q = "SELECT * FROM buku";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/buku", (req, res) => {
  const q = "INSERT INTO buku (`cover`, `title`, `description`) VALUES (?)";
  const values = [req.body.cover, req.body.title, req.body.description];

  db.query(q, [values], (err, data) => {
    if (err) return err;
    res.json(data);
  });
});

app.post("/users", (req, res) => {
  const q =
    "INSERT INTO users (`name`, `username`, `password`, `is_admin`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.username,
    req.body.password,
    req.body.is_admin,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return err;
    res.json(data);
  });
});

app.delete("/buku/:id", (req, res) => {
  const bukuId = req.params.id;
  const q = "DELETE FROM buku WHERE id = ?";

  db.query(q, [bukuId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Buku Deleted");
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, userId, (err, data) => {
    if (err) return res.json(err);
    return res.json("User Deleted");
  });
});

app.listen(8800, () => {
  console.log("connected");
});
