const express = require("express");
const controller = require("../controllers/pageController");

const router = express.Router();

router.get("/", controller.catalogPage);
router.get("/details/:id", controller.productDetailsPage);
router.get("/cart-view", controller.cartPage);

module.exports = router;