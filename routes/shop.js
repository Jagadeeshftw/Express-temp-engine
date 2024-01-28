const path = require("path");

const app = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");
const Product = require("../models/product");
const router = app.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  Product.fetchall((products) => {
    res.render("shop", { pro: products, pageName: "Admin" });
  });
});

module.exports = router;
