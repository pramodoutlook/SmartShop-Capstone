const CartItem = require("../models/CartItem");
const AppError = require("../errors/AppError");

class CartService {
  constructor(productService) {
    this.productService = productService;
    this.items = new Map();
    this.validCouponCode = "BUYFIRST26";
    this.discountRate = 0.1;
    this.taxRate = 0.12;
  }

  addItem(productId, quantity) {
    const qty = quantity === undefined ? 1 : Number(quantity);

    if (!Number.isInteger(qty) || qty < 1 || qty > 99) {
      throw new AppError(400, "Quantity must be an integer between 1 and 99");
    }

    const product = this.productService.getProductById(productId);
    if (!product) {
      throw new AppError(404, "Product not found");
    }

    const existing = this.items.get(product.id);
    const nextQuantity = existing ? existing.quantity + qty : qty;

    if (nextQuantity > 99) {
      throw new AppError(400, "Maximum quantity per product is 99");
    }

    this.items.set(product.id, new CartItem(product, nextQuantity));
    return this.getCart();
  }

  removeItem(productId) {
    const id = String(productId);
    if (!this.items.has(id)) {
      throw new AppError(404, "Cart item not found");
    }

    this.items.delete(id);
    return this.getCart();
  }

  clearCart() {
    this.items.clear();
  }

  getCart(couponCode) {
    const lines = Array.from(this.items.values()).map(function (item) {
      return {
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        lineTotal: item.getLineTotal()
      };
    });

    const subtotal = Number(
      lines.reduce(function (sum, item) {
        return sum + item.lineTotal;
      }, 0).toFixed(2)
    );

    const itemCount = lines.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);

    const normalizedCouponCode = String(couponCode || "").trim().toUpperCase();
    const couponApplied = normalizedCouponCode === this.validCouponCode;
    const discountAmount = Number(
      (couponApplied ? subtotal * this.discountRate : 0).toFixed(2)
    );
    const taxableAmount = Number((subtotal - discountAmount).toFixed(2));
    const taxAmount = Number((taxableAmount * this.taxRate).toFixed(2));
    const total = Number((taxableAmount + taxAmount).toFixed(2));

    return {
      items: lines,
      itemCount: itemCount,
      subtotal: subtotal,
      couponCode: normalizedCouponCode,
      couponApplied: couponApplied,
      discountRate: this.discountRate,
      discountAmount: discountAmount,
      taxRate: this.taxRate,
      taxAmount: taxAmount,
      total: total
    };
  }
}

module.exports = CartService;