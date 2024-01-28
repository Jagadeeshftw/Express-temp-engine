const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");
const prodControl = require("../controllers/productHandler");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

// /admin/add-product => GET
router.get("/add-product", prodControl.GETProducts);

// /admin/add-product => POST

router.post("/add-product", prodControl.POSTProducts);

module.exports = router;
