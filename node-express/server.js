const http = require("http");

// create a local server to receive data from the client
const server = http
  .createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({data: "Hello World"}));
  })
  .listen(4001, () => {
    console.log("Server running on port 4001");
  });
