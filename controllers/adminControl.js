let Product = require("../models/product");

let GETProducts = (req, res, next) => {
  res.render("./admin/add-product", {
    pageName: "Add Product",
  });
};

let POSTProducts = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  const newProduct = new Product(title, imageURL, price, description);
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
  GETAdminProducts,
};
