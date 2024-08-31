import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pw",
  database: "product_db",
});

connection.connect((err) => {
  if (err) {
    console.log("Error to connect to Database", err.stack);
    return;
  }
  console.log("Conected to Database");
});

export default connection;
