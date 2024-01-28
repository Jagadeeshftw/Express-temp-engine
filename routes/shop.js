const path = require("path");

const app = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");
const shopControl = require("../controllers/shopControl");
const Product = require("../models/product");
const router = app.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", shopControl.GETIndex);

router.get("/products", shopControl.GETProdList);

router.get("/cart", shopControl.GETCart);

router.get("/orders", shopControl.GETOrders);

router.get("/checkout", shopControl.GETCheckout);

module.exports = router;
