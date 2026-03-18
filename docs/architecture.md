# Architecture Notes

SmartShop Lite follows a clean layered architecture:

1. Routes
Defines HTTP endpoints and connects middleware + controllers.

2. Controllers
Handles request/response behavior and delegates business logic to services.

3. Services
Contains core business rules for products and cart operations.

4. Models
Simple domain entities used by services.

5. Middleware
Cross-cutting concerns:
- request logging
- validation handling
- centralized error handling

6. Views
Server-rendered EJS pages for catalog, product details, and cart.

7. Data
In-memory product catalog in src/data/productData.js.

No database is used in this starter. Cart state is in-memory and resets when server restarts.