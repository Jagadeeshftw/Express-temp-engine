let Product = require("../models/product");
let GETProducts = (req, res, next) => {
  res.render("./admin/edit-product", {
    pageName: "Add Product",
    edit: 0,
    prod: {},
  });
};

let POSTProducts = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    description: description,
    imageURL: imageURL,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

let GETEditProducts = (req, res, next) => {
  let prodId = req.params.productId;
  let editable = req.query.edit;
  console.log("went into geteditprod");
  Product.findByPk(prodId).then( (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("./admin/edit-product", {
      pageName: "Edit Product",
      edit: editable,
      prod: product,
    });
  });
};

let POSTEditProducts = (req, res, next) => {
  let prodId = req.body.productId;
  let imageURL = req.body.imageURL;
  let description = req.body.description;
  let price = req.body.price;
  let title = req.body.title;
  console.log("in post edit products");
  console.log(prodId);
  Product.findByPk(prodId).then((product)=>{
  
    product.imageURL = imageURL;
    product.description = description;
    product.price = price;
    product.title = title;
    return product.save();
    
  }).then((product)=>{
    res.redirect("/admin/products");
  });
  

};

let POSTDeleteProducts =async (req, res, next) => {
  let prodId = req.body.productId;
  Product.findByPk(prodId).then((product)=>{

    return product.destroy();
    
    
  }).then((product)=>{
    res.redirect("/admin/products");
  });

};

let GETAdminProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        pro: products,
        pageName: "Admin Products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  GETProducts,
  POSTProducts,
  GETAdminProducts,
  GETEditProducts,
  POSTEditProducts,
  POSTDeleteProducts,
};
