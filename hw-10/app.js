import express from "express";
import jwt from "jsonwebtoken";
import sequelize from "./config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/user.js";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY || "your_jwt_secret_key";

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

app.post("/register", async (req, res) => {
  try {
    const { email, password, mustChangePassword = false, role = "user" } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      mustChangePassword,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send("Error to register user");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).send("Invalid email");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }
  if (user.mustChangePassword) {
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: "1h" });
    return res.status(403).json({ error: "Password change required", redirectTo: "/change-password", token });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: "1h" });
  res.json({ token });
});

app.put("/update-email", authenticateJWT, async (req, res) => {
  try {
    const { newEmail } = req.body;
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send("User not found");
    user.email = newEmail;
    await user.save();
    res.send({ message: "Email updated successfully", user });
  } catch (error) {
    res.status(500).send("Error updating email");
  }
});

app.delete("/delete-account", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send("User not found");
    await user.destroy();
    res.send({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).send("Error deleting account");
  }
});

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).send("Access denied");
    next();
  };
};

app.put("/update-role", authenticateJWT, authorizeRole("admin"), async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send("User not found");
    user.role = newRole;
    await user.save();
    res.send({ message: "Role updated successfully", user });
  } catch (error) {
    res.status(500).send("Error updating role");
  }
});

app.post("/refresh-token", authenticateJWT, (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).send("Access denied");

    jwt.verify(token, secretKey, (err, user) => {
      if (err && err.name === "TokenExpiredError") return res.status(403).send("Token expired");
      if (err) return res.status(403).send("Invalid token");

      const newToken = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: "1h" });
      res.send({ token: newToken });
    });
  } catch (error) {
    res.status(500).send("Error refreshing token");
  }
});

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Server is up and running on http://localhost:${port}`);
});
