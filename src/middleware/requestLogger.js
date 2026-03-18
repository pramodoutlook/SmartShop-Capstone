const logger = require("../config/logger");

module.exports = function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", function () {
    const durationMs = Date.now() - start;
    logger.info("HTTP request completed", {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: durationMs
    });
  });

  next();
};