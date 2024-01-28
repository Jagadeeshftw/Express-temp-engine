const Product = require("../models/product");

let GETProdList = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop/productList", { pro: products, pageName: "All Products" });
  });
};

let GETIndex = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop/index", { pro: products, pageName: "Index Page" });
  });
};

let GETCart = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop/cart", { pro: products, pageName: "My Cart" });
  });
};

let GETOrders = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop/orders", { pro: products, pageName: "My Orders" });
  });
};
let GETCheckout = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop/checkout", { pro: products, pageName: "Checkout" });
  });
};
module.exports = { GETProdList, GETIndex ,GETCart, GETCheckout,GETOrders};
