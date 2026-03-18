const express = require("express");
const controller = require("../controllers/productController");
const validators = require("../validators/productValidators");
const validateRequest = require("../middleware/validateRequest");

const router = express.Router();

router.get("/products", validators.listProducts, validateRequest, controller.getProducts);
router.get("/products/:id", validators.getProductById, validateRequest, controller.getProductById);

module.exports = router;
