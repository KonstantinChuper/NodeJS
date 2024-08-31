const http = require("http");

const PORT = 3333;

const server = http.createServer((req, res) => {
  if (req.method === "PUT") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("PUT-request processed");
  } else if (req.method === "DELETE") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("DELETE-request processed");
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method not supported");
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`);
});
