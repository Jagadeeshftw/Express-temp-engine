const fs = require("fs");
const path = require("path");

let p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

class Cart {
  static addProduct = (id, productPrice) => {
    let cart = { products: [], totalPrice: 0 };
    fs.readFile(p, (err, data) => {
      if (!err) {
        try {
          cart = JSON.parse(data);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      }

      let existingContentIndex = cart.products.findIndex((p) => p.id == id);
      let existingContent = cart.products[existingContentIndex];
      let updatedContent;
      if (existingContent) {
        updatedContent = { ...existingContent };
        updatedContent.qnty = existingContent.qnty + 1;
        cart.products = [...cart.products];
        cart.products[existingContentIndex] = updatedContent;
      } else {
        updatedContent = { id: id, qnty: 1 };
        cart.products = [...cart.products, updatedContent];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  };

  static deleteProduct = (id, productPrice) => {
    let cart = { products: [], totalPrice: 0 };
    fs.readFile(p, (err, data) => {
      if (!err) {
        try {
          cart = JSON.parse(data);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      }

      let existingContentIndex = cart.products.findIndex((p) => p.id == id);

      let existingContent = cart.products[existingContentIndex];

      let existingContentQunty = existingContent.qnty;

      let new_cart = {
        products: cart.products.filter((p) => p !== existingContent),
        totalPrice: cart.totalPrice - +(productPrice * existingContentQunty),
      };

      fs.writeFile(p, JSON.stringify(new_cart), (err) => {
        console.log(err);
      });
    });
  };
}

module.exports = Cart;
