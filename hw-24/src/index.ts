import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post("/data", (req: Request, res: Response) => {
  const data = req.body;
  res.json({ message: "Received data", data });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
