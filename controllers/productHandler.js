let Product = require("../models/product");

let GETProducts = (req, res, next) => {
  res.render("add-product", {
    pageName: "Add Product",
  });
};

let POSTProducts = (req, res, next) => {
  const newProduct = new Product(req.body.title);
  newProduct.save();

  res.redirect("/");
};

module.exports = {
  GETProducts,
  POSTProducts,

};
