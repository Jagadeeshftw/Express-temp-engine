const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");

const router = express.Router();

let products = [];
let pageName = "Add Product";
router.use(bodyParser.urlencoded({ extended: false }));

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageName: "Add Product",
  });
});

// /admin/add-product => POST

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = { router, products };
