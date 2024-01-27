const path = require("path");

const app = require("express");

const rootDir = require("../util/path");
const bodyParser = require("body-parser");
const prod = require("../controllers/products");
const router = app.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res, next) => {
  res.render("shop", { pro: prod.data, pageName: "Admin" });
});

module.exports = router;
