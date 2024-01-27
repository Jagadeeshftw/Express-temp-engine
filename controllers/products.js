let Product = require("../models/product");

let getProducts = (req, res, next) => {
  res.render("add-product", {
    pageName: "Add Product",
  });
};

let postProducts = (req, res, next) => {
  const newProduct = new Product(req.body.title);
  newProduct.save();

  res.redirect("/");
};

module.exports = { getProducts, postProducts, data: Product.fetchall() };
