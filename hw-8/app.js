import express from "express";
import sequelize from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
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
