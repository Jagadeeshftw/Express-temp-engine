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
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      console.log("printing all the products");
      console.log(products);
      res.render("shop/cart", {
        pageName: "My Cart",
        products: products,
      });
    });
};

let POSTCart = (req, res, next) => {
  let prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } }).then((products) => {
        let product = products[0];

        if (products.length > 0) {
          let oldQuantity = product.cartItems.quantity;
          newQuantity = newQuantity + oldQuantity;
        }
        return Product.findByPk(prodId).then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
        });
      });
    })
    .then((cart) => {
      res.redirect("/cart");
    });
};

let POSTCartDeleteItems = (req, res, next) => {
  let prodId = req.body.productId;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } }).then((products) => {
        let product = products[0];
        return product.cartItems.destroy();
      });
    })
    .then((cart) => {
      console.log("printing all products in cart");
      console.log(cart);
      res.redirect("/cart");
    });
};

let GETOrders = (req, res, next) => {
  req.user
    .getOrder()
    .then((order) => {
      console.log("orders in get")
      console.log(order);
      return order.getProducts();
    })
    .then((products) => {
      console.log("my products");
      console.log(products);
      res.render("shop/orders", { products: products, pageName: "My Orders" });
    });
};

let POSTOrders = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      console.log("printing all the available products");
      console.log(products);
      return req.user.createOrder().then((order) => {
        let modifiedProducts = products.map((product) => {
          product.orderItems = { quantity: product.cartItems.quantity };
          return product;
        });
        return order.addProducts(modifiedProducts);
      });
    })
    .then((order) => {
      console.log("printing orders")
      console.log(order);
      return fetchedCart.setProducts(null);
    })
    .then((order) => {
      res.redirect("/orders");
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
  POSTOrders,
  POSTCartDeleteItems,
};
