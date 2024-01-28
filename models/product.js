const fs = require("fs");
const path = require("path");

let p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "product.json"
);

class Product {
  constructor(data) {
    this.title = data;
  }
  save() {
    fs.readFile(p, (err, data) => {
      let products = [];
      if (!err) {
        products = JSON.parse(data);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchall(cb) {
    fs.readFile(p, (err, data) => {
      if (err) cb([]);
      else cb(JSON.parse(data));
    });
  }
}

module.exports = Product;
