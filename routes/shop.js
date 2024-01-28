const path = require("path");

const app = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");
const productList = require("../controllers/productList");
const Product = require("../models/product");
const router = app.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", productList);

module.exports = router;
