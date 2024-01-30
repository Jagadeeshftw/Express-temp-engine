const Product = require("../models/product");
const Cart = require("../models/cart");

let GETProdList = (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop/productList", { pro: products, pageName: "All Products" });
  });
};

let GETProdDetails = (req, res, next) => {
  let prodId = req.params.productId;
  Product.findById(prodId, (products) => {
    res.render("shop/product-details", {
      pro: products,
      pageName: "All Products",
    });
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

let POSTCart = (req, res, next) => {
  console.log(req.body.productId);
  let prodId = req.body.productId;
  // Product.fetchall((products) => {
  //   res.render("shop/cart", { pro: products, pageName: "My Cart" });
  // });
  Product.findById(prodId, (products) => {
    console.log(products);
    Cart.addProduct(prodId, products.price);
  });
  res.redirect("/cart");
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
module.exports = {
  GETProdList,
  GETIndex,
  GETCart,
  GETCheckout,
  GETOrders,
  GETProdDetails,
  POSTCart,
};
