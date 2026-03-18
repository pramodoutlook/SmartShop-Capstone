const productData = require("../data/productData");
const ProductService = require("./productService");
const CartService = require("./cartService");

const productService = new ProductService(productData);
const cartService = new CartService(productService);

module.exports = {
  productService,
  cartService
};