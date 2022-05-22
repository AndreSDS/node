const express = require("express");
const {randomUUID} = require("crypto");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];
fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  products = JSON.parse(data);
});

app.post("/products", (req, res) => {
  const {name, price} = req.body;

  const product = {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

  createProductsFile();

  return res.json(product);
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  const {id} = req.params;

  const product = products.find((product) => product.id === id);

  return res.json(product);
});

app.put("/products/:id", (req, res) => {
  const {id} = req.params;
  const {name, price} = req.body;

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex < 0) {
    return res.status(400).json({error: "Product not found"});
  }

  products[productIndex] = {
    ...products[productIndex],
    name: name,
    price: price,
  };

  createProductsFile();

  return res.json({message: "Produto alterado com sucesso", product});
});

app.delete("/products/:id", (req, res) => {
  const {id} = req.params;

  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex < 0) {
    return res.status(400).json({error: "Product not found"});
  }

  products.splice(productIndex, 1);

  createProductsFile();

  return res.json({message: "Produto removido com sucesso"});
});

app.listen(4002, () => console.log("Servidor rodando na porta 4002"));

function createProductsFile() {
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("The file has been saved!");
  });
}
