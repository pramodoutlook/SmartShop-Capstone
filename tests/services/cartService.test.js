const ProductService = require("../../src/services/productService");
const CartService = require("../../src/services/cartService");
const productData = require("../../src/data/productData");

describe("CartService", function () {
  let productService;
  let cartService;

  beforeEach(function () {
    productService = new ProductService(productData);
    cartService = new CartService(productService);
  });

  test("adds an item to cart", function () {
    const cart = cartService.addItem("p-1001", 2);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(2);
    expect(cart.itemCount).toBe(2);
  });

  test("adds same item twice and merges quantity", function () {
    cartService.addItem("p-1001", 1);
    const cart = cartService.addItem("p-1001", 3);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].quantity).toBe(4);
  });

  test("removes an existing item", function () {
    cartService.addItem("p-1002", 1);
    const cart = cartService.removeItem("p-1002");
    expect(cart.items).toHaveLength(0);
    expect(cart.itemCount).toBe(0);
  });

  test("throws for unknown product id", function () {
    expect(function () {
      cartService.addItem("bad-id", 1);
    }).toThrow("Product not found");
  });

  test("throws for invalid quantity", function () {
    expect(function () {
      cartService.addItem("p-1001", 0);
    }).toThrow("Quantity must be an integer between 1 and 99");
  });

  test("throws when removing non-existent cart item", function () {
    expect(function () {
      cartService.removeItem("p-1001");
    }).toThrow("Cart item not found");
  });

  test("calculates subtotal correctly", function () {
    cartService.addItem("p-1001", 1); // 89.99
    cartService.addItem("p-1004", 2); // 28.50
    const cart = cartService.getCart();
    expect(cart.subtotal).toBe(118.49);
  });

  test("applies 10% coupon discount with 12% tax", function () {
    cartService.addItem("p-1001", 1); // 89.99
    cartService.addItem("p-1004", 2); // 28.50

    const cart = cartService.getCart("BUYFIRST26");

    expect(cart.couponApplied).toBe(true);
    expect(cart.discountAmount).toBe(11.85);
    expect(cart.taxAmount).toBe(12.8);
    expect(cart.total).toBe(119.44);
  });

  test("does not apply discount for invalid coupon", function () {
    cartService.addItem("p-1001", 1); // 89.99
    const cart = cartService.getCart("WRONG");

    expect(cart.couponApplied).toBe(false);
    expect(cart.discountAmount).toBe(0);
    expect(cart.taxAmount).toBe(10.8);
    expect(cart.total).toBe(100.79);
  });
});