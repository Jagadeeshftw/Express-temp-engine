const fs = require("fs");
const path = require("path");

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
  constructor(title, imageURL, price, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }
  save() {
    getDataFromFiles((products) => {
      this.id = Math.random().toString();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchall(cb) {
    getDataFromFiles(cb);
  }

  static findById(prodId,cb)
  {
      getDataFromFiles((products)=>{
       let product = products.find(p=> p.id ===prodId);
       cb(product);
      })
  }
}

module.exports = Product;
