const Product = require("../models/product");
const Cart = require("../models/cart");

let GETProdList = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/productList", {
        pro: products,
        pageName: "All Products",
      });
    })
    .catch((err) => {
      console.log(err);
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
  Product.findAll()
    .then((products) => {
      res.render("shop/index", { pro: products, pageName: "Index Page" });
    })
    .catch((err) => {
      console.log(err);
    });
};

let GETCart = (req, res, next) => {
  Cart.getCart((cart) => {
    let cartData = [];
    Product.fetchall((products) => {
      for (product of products) {
        let cartProduct = cart.products.find((p) => p.id === product.id);
        if (cart.products.find((p) => p.id == product.id)) {
          cartData.push({ productData: product, qnty: cartProduct.qnty });
        }
      }
      res.render("shop/cart", { cart: cartData, pageName: "My Cart" });
    });
  });
};

let POSTCart = (req, res, next) => {
  let prodId = req.body.productId;

  Product.findById(prodId, (products) => {
    Cart.addProduct(prodId, products.price);
    res.redirect("/cart");
  });
};

let POSTCartDeleteItems = (req, res, next) => {
  let prodId = req.body.productId;

  Product.findById(prodId, (products) => {
    Cart.deleteProduct(prodId, products.price);
    res.redirect("/cart");
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
module.exports = {
  GETProdList,
  GETIndex,
  GETCart,
  GETCheckout,
  GETOrders,
  GETProdDetails,
  POSTCart,
  POSTCartDeleteItems,
};
