const http = require("http");
const fs = require("fs");

const PORT = 3333;

const server = http.createServer((req, res) => {
  try {
    throw new Error("Server error");
  } catch (error) {
    fs.appendFile("errors.log", `${new Date().toISOString()} - ${error.message}\n`, (err) => {
      if (err) {
        console.error(`Error logging to file: ${err}`);
      }
    });
    res.writeHead(500, { "Content-type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`);
});
