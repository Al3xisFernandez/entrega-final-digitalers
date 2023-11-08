const { use } = require("passport");
const Product = require("../models/product");
const product = require("../models/product");

const productCtrl = {};

productCtrl.renderProductsForm = (req, res) => {
  res.render("products/newproducts");
};
productCtrl.createNewProducts = async (req, res) => {
  const { title, description } = req.body;
  const newProduct = new Product({ title, description });
  newProduct.user = req.user.id;
  await newProduct.save();
  req.flash("success_msg", "Product Added Successfully");
  res.redirect("/products");
};

productCtrl.renderProducts = async (req, res) => {
  const products = await product.find({ user: req.user.id }).sort({ createdAt: "desc" });
  res.render("products/allproducts", { products });
};

productCtrl.renderEditProduct = async (req, res) => {
  const Product = await product.findById(req.params.id);
  if(Product.user != req.user.id){
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/products");
  }
  res.render("products/editproducts", { Product });
};

productCtrl.updateProduct = async (req, res) => {
  const { title, description } = req.body;
  await product.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Product Updated Successfully");
  res.redirect("/products");
};

productCtrl.deleteProduct = async (req, res) => {
  await product.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Product Deleted Successfully");
  res.redirect("/products");
};

module.exports = productCtrl;
