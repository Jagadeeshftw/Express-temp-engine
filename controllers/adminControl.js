let Product = require("../models/product");

let GETProducts = (req, res, next) => {
  res.render("./admin/add-product", {
    pageName: "Add Product",
  });
};

let POSTProducts = (req, res, next) => {
  const newProduct = new Product(req.body.title);
  newProduct.save();

  res.redirect("/");
};

let GETAdminProducts = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("admin/products", { pro: products, pageName: "Admin Products" });
  });
};

module.exports = {
  GETProducts,
  POSTProducts,
  GETAdminProducts
};
