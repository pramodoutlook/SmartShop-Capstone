const { cartService } = require("../services/serviceRegistry");

function acceptsHtml(req) {
	return (req.get("accept") || "").includes("text/html");
}

exports.getCart = function (req, res, next) {
	try {
		return res.status(200).json(cartService.getCart(req.query.coupon));
	} catch (error) {
		return next(error);
	}
};

exports.addToCart = function (req, res, next) {
	try {
		const productId = req.body.productId;
		const quantity = req.body.quantity;
		const cart = cartService.addItem(productId, quantity);

		if (acceptsHtml(req)) {
			return res.redirect("/cart-view");
		}

		return res.status(201).json({
			message: "Item added to cart",
			cart: cart
		});
	} catch (error) {
		return next(error);
	}
};

exports.removeFromCart = function (req, res, next) {
	try {
		const cart = cartService.removeItem(req.params.id);

		if (acceptsHtml(req)) {
			return res.redirect("/cart-view");
		}

		return res.status(200).json({
			message: "Item removed from cart",
			cart: cart
		});
	} catch (error) {
		return next(error);
	}
};