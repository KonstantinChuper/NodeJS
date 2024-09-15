import express from "express";
import sequelize from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/user.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from simple server :)");
});

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
    const token = jwt.sign({ id: user.id, email: user.email }, "Your_secret_key", { expiresIn: "1h" });
    return res.status(403).json({ error: "Password change required", redirectTo: "/change-password", token });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, "Your_secret_key", { expiresIn: "1h" });
  res.json({ token });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided");
  }
  jwt.verify(token, "Your_secret_key", (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
};

const checkPasswordChange = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  if (user.mustChangePassword) {
    if (req.path === "/change-password") {
      return next();
    }
    return res.status(403).json({ error: "Password change required", redirectTo: "/change-password" });
  }
  next();
};

const checkRole = (role) => (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== role) {
    return res.status(403).send("Access denied");
  }
  next();
};

app.get("/admin", authenticateToken, checkRole("admin"), (req, res) => {
  res.send("Welcome to admin area");
});

app.use(authenticateToken);
app.use(checkPasswordChange);

app.get("/change-password", (req, res) => {
  res.send("Please change your password");
});

app.post("/change-password", async (req, res) => {
  try {
    const userId = req.user.id;
    const { newPassword } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).send("New password must be different from the old one");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword, mustChangePassword: false }, { where: { id: userId } });
    res.status(200).send("Password was changed successfully");
  } catch (error) {
    res.status(500).send("Error to change password");
  }
});

app.post("/delete", authenticateToken, async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (!password) {
      return res.status(400).send("Enter correct password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      returnres.status(401).send("Invalid password");
    }
    await User.destroy({ where: { id: userId } });
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting account");
  }
});

app.post("/change-email", async (req, res) => {
  const { newEmail, password } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }
    const existingUser = await User.findOne({ where: { email: newEmail } });
    if (existingUser) {
      return res.status(400).send("Email already in use");
    }
    await User.update({ email: newEmail }, { where: { id: userId } });
    res.status(200).send("Email updated successfully");
  } catch {
    res.status(500).send("Error updating email");
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
