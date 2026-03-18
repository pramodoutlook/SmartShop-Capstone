# SmartShop Lite

SmartShop Lite is a lightweight eCommerce starter repository inspired by eShopOnWeb patterns, built with Node.js, Express, EJS, Jest, and GitHub Actions.

## Features

- Product catalog with search
- Product details page
- Shopping cart add/remove
- REST APIs
- Server-rendered frontend
- Input validation with express-validator
- Logging with winston
- Environment-based configuration
- Unit tests for services
- CI pipeline with GitHub Actions

## Tech Stack

- Backend: Node.js + Express
- Frontend: EJS server-rendered pages
- Testing: Jest
- CI/CD: GitHub Actions

## Project Structure

See docs/architecture.md and docs/api.md for details.

## API Endpoints

- GET /products
- GET /products/:id
- POST /cart
- DELETE /cart/:id

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   ```bash
   cp .env.example .env
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open in browser:

   ```bash
   http://localhost:3000
   ```

## Run Tests

```bash
npm test
```

## CI

The GitHub Actions workflow runs on push and pull_request:

- npm ci
- npm run build
- npm test

## Notes

- Data and cart are in-memory (no database).
- Cart resets when the server restarts.
- This repository is intentionally simple but production-structured.

