const AppError = require("../errors/AppError");
const { productService, cartService } = require("../services/serviceRegistry");

exports.catalogPage = function (req, res, next) {
	try {
		const q = req.query.q || "";
		const products = productService.listProducts(q);
		const cart = cartService.getCart();

		return res.render("catalog", {
			title: "SmartShop Lite",
			products: products,
			q: q,
			cartCount: cart.itemCount
		});
	} catch (error) {
		return next(error);
	}
};

exports.productDetailsPage = function (req, res, next) {
	try {
		const product = productService.getProductById(req.params.id);
		if (!product) {
			throw new AppError(404, "Product not found");
		}

		const cart = cartService.getCart();

		return res.render("product-details", {
			title: product.name,
			product: product,
			cartCount: cart.itemCount
		});
	} catch (error) {
		return next(error);
	}
};

exports.cartPage = function (req, res, next) {
	try {
		const coupon = req.query.coupon || "";
		const cart = cartService.getCart(coupon);

		return res.render("cart", {
			title: "Your Cart",
			cart: cart,
			cartCount: cart.itemCount
		});
	} catch (error) {
		return next(error);
	}
};