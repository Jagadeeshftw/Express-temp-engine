const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");
const prodControl = require("../controllers/adminControl");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

// /admin/add-product => GET
router.get("/add-product", prodControl.GETProducts);

router.get("/edit-product/:productId", prodControl.GETEditProducts);

router.post("/edit-product", prodControl.POSTEditProducts);

router.post("/delete-product", prodControl.POSTDeleteProducts);

// /admin/add-product => POST

router.post("/add-product", prodControl.POSTProducts);

router.get("/products", prodControl.GETAdminProducts);
module.exports = router;
