import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./Models/Category.js";
import Product from "./Models/Products.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("Hello from my server");
});

app.post("/categories", async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    res.status(500).send({ error: "Error creating category" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    });
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send({ error: "Failed to create product" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: "Failed to get product" });
  }
});

async function connectToDB() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to DB successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error connecting to DB");
    throw error;
  }
}
connectToDB();
