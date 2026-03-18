const { param, query } = require("express-validator");

module.exports = {
  listProducts: [
    query("q")
      .optional()
      .isString()
      .isLength({ max: 100 })
      .withMessage("Search query must be a string with max length 100")
  ],
  getProductById: [
    param("id")
      .isString()
      .notEmpty()
      .isLength({ max: 50 })
      .withMessage("Product id is required")
  ]
};