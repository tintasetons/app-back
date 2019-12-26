const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");
const Product = require("./models/Product");

routes.get("/products", async (req, res) => {
  const products = await Product.find();

  return res.json(products);
});


routes.post("/products", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: codigo } = req.file;
  const product = await Product.create({
    codigo,
  });

  return res.json(product);
});

routes.delete("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  await product.remove();

  return res.send();
});

routes.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  return res.send(product);
});




routes.get("/posts", async (req, res) => {
  const posts = await Post.find();
  console.log(posts);
  return res.json(posts);
});

routes.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  return res.send(post);
});



routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name , size, key, location: url = "" } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url
  });

  return res.json(post);
});

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await post.remove();

  return res.send();
});

module.exports = routes;