import express from "express";
import sequelize from "./config/db.js";
import Book from "./models/book.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book shop");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).send("Error to get books");
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
      return res.status(400).json({ error: "Fill out all fields" });
    }
    const addedBook = await Book.create({ title, author, year });
    res.status(201).json(addedBook);
  } catch (error) {
    console.error("Error to create book:", error);
    res.status(500).send("Error to create book");
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).send("Book not found");
    }
    await book.update({ title, author, year });
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    app.status(500).send("Error to change book");
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).send("Book not found");
    }
    await book.destroy();
    res.status(200).send("Book deleted successfully");
  } catch (error) {
    console.error(error);
    app.status(500).send("Error to delete book");
  }
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Server is up and running on http://localhost:${port}`);
});
