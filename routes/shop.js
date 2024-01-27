const path = require("path");

const app = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");


const adminRoutes = require("./admin")

const router = app.Router();

router.use(bodyParser.urlencoded({ extended: false }));

let pageName = "Shop";
let prod = adminRoutes.products;
router.get("/", (req, res, next) => {
  res.render("shop", { prod, pageName });
});

module.exports = router;
