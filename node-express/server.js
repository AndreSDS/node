const http = require("http");

// create a local server to receive data from the client
const server = http
  .createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "application/json"});

    if (req.url === "/produto") {
      res.end(JSON.stringify({message: "Product route"}));
    }

    if (req.url === "/usuarios") {
      res.end(JSON.stringify({message: "Users route"}));
    }

    res.end(JSON.stringify({message: "Qualquer outra rota"}));
  })
  .listen(4001, () => {
    console.log("Server running on port 4001");
  });
