const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");
const prod = require("../controllers/products");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

// /admin/add-product => GET
router.get("/add-product", prod.getProducts);

// /admin/add-product => POST

router.post("/add-product", prod.postProducts);

module.exports = router;
