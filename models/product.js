let products = [];

class Product {
  constructor(data) {
    this.title = data;
  }
  save() {
    products.push(this);
  }

  static fetchall() {
    return products;
  }
}

module.exports = Product;
