const { body, param } = require("express-validator");

module.exports = {
  addToCart: [
    body("productId")
      .isString()
      .notEmpty()
      .withMessage("productId is required"),
    body("quantity")
      .optional()
      .isInt({ min: 1, max: 99 })
      .withMessage("quantity must be an integer between 1 and 99")
  ],
  removeFromCart: [
    param("id")
      .isString()
      .notEmpty()
      .withMessage("Cart item id is required")
  ]
};