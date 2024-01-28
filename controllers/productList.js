const Product = require("../models/product");

let GETProd = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop", { pro: products, pageName: "Admin" });
  });
};

module.exports = GETProd;
