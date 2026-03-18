const path = require("path");
const express = require("express");
const env = require("./config/env");
const logger = require("./config/logger");
const requestLogger = require("./middleware/requestLogger");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const pageRoutes = require("./routes/pageRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);

app.use("/", pageRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

if (require.main === module) {
  app.listen(env.port, function () {
    logger.info("SmartShop Lite started", {
      port: env.port,
      nodeEnv: env.nodeEnv
    });
  });
}

module.exports = app;