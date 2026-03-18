class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.setQuantity(quantity);
  }

  setQuantity(quantity) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new Error("Quantity must be an integer between 1 and 99");
    }
    this.quantity = quantity;
  }

  getLineTotal() {
    return Number((this.product.price * this.quantity).toFixed(2));
  }
}

module.exports = CartItem;