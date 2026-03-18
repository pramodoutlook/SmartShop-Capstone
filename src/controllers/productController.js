const { productService } = require("../services/serviceRegistry");

exports.getProducts = function (req, res, next) {
  try {
    const q = req.query.q || "";
    const products = productService.listProducts(q);
    return res.status(200).json({ items: products, count: products.length });
  } catch (error) {
    return next(error);
  }
};

exports.getProductById = function (req, res, next) {
  try {
    const product = productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};