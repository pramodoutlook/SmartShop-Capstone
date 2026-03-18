const express = require("express");
const controller = require("../controllers/cartController");
const validators = require("../validators/cartValidators");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.get("/cart", controller.getCart);
router.post("/cart", validators.addToCart, validateRequest, controller.addToCart);
router.delete("/cart/:id", validators.removeFromCart, validateRequest, controller.removeFromCart);

module.exports = router;
