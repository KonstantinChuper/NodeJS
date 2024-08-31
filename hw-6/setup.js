import connection from "./db.js";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
)`;

connection.query(createTableQuery, (err, results) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table products crreated successfully or it already exists");
  }
  connection.end();
});
