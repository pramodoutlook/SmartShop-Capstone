const logger = require("../config/logger");
const AppError = require("../errors/AppError");

function notFoundHandler(req, res, next) {
  next(new AppError(404, "Route not found"));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  logger.error("Request failed", {
    statusCode: statusCode,
    message: err.message,
    stack: err.stack,
    path: req.originalUrl
  });

  const acceptsHtml = (req.get("accept") || "").includes("text/html");
  if (acceptsHtml) {
    return res.status(statusCode).render("error", {
      statusCode: statusCode,
      message: message
    });
  }

  return res.status(statusCode).json({
    error: message
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};