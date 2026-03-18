const Product = require("../models/Product");

class ProductService {
  constructor(productData) {
    this.products = productData.map(function (item) {
      return new Product(item);
    });
  }

  listProducts(searchTerm) {
    if (!searchTerm) {
      return this.products;
    }

    const normalized = String(searchTerm).toLowerCase().trim();
    return this.products.filter(function (product) {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized)
      );
    });
  }

  getProductById(id) {
    const productId = String(id);
    return this.products.find(function (product) {
      return product.id === productId;
    }) || null;
  }
}

module.exports = ProductService;