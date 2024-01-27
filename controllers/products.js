let products = [];

let getProducts = (req, res, next) => {
  res.render("add-product", {
    pageName: "Add Product",
  });
};

let postProducts = (req, res, next) => {
  products.push({ title: req.body.title });
  
  res.redirect("/");
};

module.exports = { getProducts, postProducts, data: products };
