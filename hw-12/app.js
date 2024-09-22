import express from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

async function startServer() {
  const db = await connectToDatabase();
  const productsCollection = db.collection("products");

  app.get("/", (req, res) => {
    try {
      res.status(200).send("Hello from simple server:)");
    } catch (error) {
      res.status(500).send("Error to connect");
    }
  });

  app.post("/products", async (req, res) => {
    try {
      const { name, price, description } = req.body;
      const newProduct = { name, price, description };
      const result = await productsCollection.insertOne(newProduct);
      res.status(201).json({ _id: result.insertedId, ...newProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.get("/products", async (req, res) => {
    try {
      const products = await productsCollection.find().toArray();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/products/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productsCollection.findOne({ _id: new ObjectId(id) });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.put("/products/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { name, price, description } = req.body;
      const updatedProduct = { name, price, description };
      const result = await productsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Product updated successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/products/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

startServer();
