const { validationResult } = require("express-validator");
const AppError = require("../errors/AppError");

module.exports = function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const messages = errors.array().map(function (error) {
    return error.msg;
  });

  return next(new AppError(400, "Validation failed: " + messages.join("; ")));
};