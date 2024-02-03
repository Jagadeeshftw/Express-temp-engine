const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

let p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "product.json"
);

let getDataFromFiles = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.error(err);
      cb([]);
    } else {
      try {
        const jsonData = JSON.parse(data);
        cb(jsonData);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        cb([]);
      }
    }
  });
};

class Product {
  constructor(id, title, imageURL, price, description) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }
  save() {
    if (this.id) {
      getDataFromFiles((products) => {
        let tempProdIndex = products.findIndex((p) => p.id === this.id);
        let updatedProd = [...products];
        updatedProd[tempProdIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProd), (err) => {});
      });
    } else {
      getDataFromFiles((products) => {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {});
      });
    }
  }

  static fetchall(cb) {
    getDataFromFiles(cb);
  }

  static findById(prodId, cb) {
    getDataFromFiles((products) => {
      console.log("All products:", products);

      console.log("Searching for product with ID:", prodId);

      let product = products.find((p) => {
        console.log("Current product ID:", p.id, "Type:", typeof p.id);
        console.log("Target product ID:", prodId, "Type:", typeof prodId);
        return p.id === prodId;
      });

      console.log("Found product:", product);

      cb(product);
    });
  }
  static deleteById(prodId) {
    getDataFromFiles((products) => {
      let prod = products.find((p) => p.id === prodId);
      let updatedProducts = products.filter((p) => {
        return p.id !== prodId;
      });
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        console.log("in product.js file");
        console.log(prodId, prod.price);
        console.log("completed");
        Cart.deleteProduct(prodId, prod.price);
      });
    });
  }
}

module.exports = Product;
