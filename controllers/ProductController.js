const Product = require("../models/Product");

// Get All Products
const product_all = async (req, res) => {
  try {
    const p1 = await Product.find();
    res.json(p1);
  } catch (error) {
    res.json({ message: error });
  }
};

// Get Product Detail
const product_detail = async (req, res) => {
  try {
    const p1 = await Product.findById(req.params.id);
    res.json(p1);
  } catch (error) {
    res.json({ message: error });
  }
};

// Create Product
const product_create = async (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });

  try {
    const p1 = await product.save();
    res.json(p1);
  } catch (error) {
    res.json({ message: error });
  }
};

// Update Product
const product_update = async (req, res) => {
  try {
    const product = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    };
    const p1 = await Product.findByIdAndUpdate({ _id: req.params.id }, product);
    res.json(p1);
  } catch (error) {
    res.json({ message: error });
  }
};

// Delete Product
const product_delete = async (req, res) => {
  try {
    const p1 = await Product.findByIdAndDelete(req.params.id);
    res.json(p1);
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = {
  product_all,
  product_detail,
  product_create,
  product_update,
  product_delete,
};
