import express from "express";
import connection from "./db.js";

const app = express();
const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || "127.0.0.1";

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("Hello world!");
  } catch (error) {
    res.status(500).send("Error processing GET request", error);
  }
});

app.post("/", (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      throw new Error("No data in request");
    }
    res.status(200).send("POST-request processed");
  } catch (error) {
    res.status(400).send("Error processing POST request: ", error.message);
  }
});

app.get("/products", (req, res) => {
  try {
    const query = "SELECT * FROM products";
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).send("Ошибка получения данных");
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    res.status(500).send("Error processing GET request", error);
  }
});

app.post("/products", (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(500).send("No product data available");
    }

    const query = "INSERT INTO products (name, price) VALUES (?, ?)";
    connection.query(query, [name, price], (err, results) => {
      if (err) {
        res.status(500).send("Error adding product");
      } else {
        res.status(200).send("Product added successfully");
      }
    });
  } catch (error) {
    res.status(400).send("Error processing POST request: ", error.message);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server started at http://${HOST}:${PORT}`);
});
