# SmartShop Lite API

Base URL: http://localhost:3000

## GET /products

Returns the full product list.
Supports optional search query parameter q.

Example:
GET /products?q=shoe

Response:
{
  "items": [...],
  "count": 1
}

## GET /products/:id

Returns a single product by id.

Example:
GET /products/p-1001

Response:
{
  "id": "p-1001",
  "name": "Trail Runner Shoes",
  ...
}

## POST /cart

Adds an item to the cart.

Request body:
{
  "productId": "p-1001",
  "quantity": 2
}

Response:
{
  "message": "Item added to cart",
  "cart": {
    "items": [...],
    "itemCount": 2,
    "subtotal": 179.98
  }
}

## DELETE /cart/:id

Removes an item from the cart using product id.

Example:
DELETE /cart/p-1001

Response:
{
  "message": "Item removed from cart",
  "cart": {
    "items": [],
    "itemCount": 0,
    "subtotal": 0
  }
}

## GET /cart

Returns current cart snapshot.

Response:
{
  "items": [...],
  "itemCount": 2,
  "subtotal": 179.98
}

## Error response format

{
  "error": "Validation failed: quantity must be an integer between 1 and 99"
}