const fs = require("fs");
const path = require("path");

let p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "product.json"
);

let getDataFromFiles = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) cb([]);
    else cb(JSON.parse(data));
  });
};

class Product {
  constructor(data) {
    this.title = data;
  }
  save() {
    getDataFromFiles((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchall(cb) {
    getDataFromFiles(cb);
  }
}

module.exports = Product;
