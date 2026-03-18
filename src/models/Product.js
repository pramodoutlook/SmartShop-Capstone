class Product {
  constructor(data) {
    this.id = String(data.id);
    this.name = String(data.name);
    this.description = String(data.description);
    this.category = String(data.category);
    this.price = Number(data.price);
    this.imageUrl = String(data.imageUrl || "");
  }
}

module.exports = Product;