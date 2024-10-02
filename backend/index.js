import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "Product1", price: 19.99 },
    { id: 2, name: "Product2", price: 9.99 },
    { id: 3, name: "Product3", price: 14.99 },
  ];

  if (req.query.search) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
    res.send(filteredProducts);
    return;
  }
  setTimeout(() => {
    res.send(products);
  }, 3000);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port:  ${port}`);
});
