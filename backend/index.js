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

app.listen(8800, () => {
  console.log("connected");
});
