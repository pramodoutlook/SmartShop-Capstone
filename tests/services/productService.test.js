const ProductService = require("../../src/services/productService");
const productData = require("../../src/data/productData");

describe("ProductService", function () {
  let service;

  beforeEach(function () {
    service = new ProductService(productData);
  });

  test("returns all products when no search term is provided", function () {
    const results = service.listProducts();
    expect(results).toHaveLength(productData.length);
  });

  test("filters products by search term (case-insensitive)", function () {
    const results = service.listProducts("yoga");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Yoga Mat");
  });

  test("returns empty array when no products match search", function () {
    const results = service.listProducts("nonexistent-item");
    expect(results).toHaveLength(0);
  });

  test("returns product by id", function () {
    const product = service.getProductById("p-1003");
    expect(product).not.toBeNull();
    expect(product.name).toBe("Bluetooth Earbuds");
  });

  test("returns null for unknown id", function () {
    const product = service.getProductById("missing-id");
    expect(product).toBeNull();
  });
});