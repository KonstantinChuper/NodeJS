const http = require("http");

const PORT = 3333;

const server = http.createServer((req, res) => {
    const auth = req.headers.authorization;
    if (!auth) {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Unauthorized");
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Authorization header received");
    }
})

server.listen(PORT, () => {
  console.log(`Server started on port http://127.0.0.1:${PORT}`);
});