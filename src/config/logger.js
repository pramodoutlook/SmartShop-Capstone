const { createLogger, format, transports } = require("winston");
const env = require("./env");

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: "HH:mm:ss" }),
  format.printf(function (info) {
    const meta = Object.assign({}, info);
    delete meta.level;
    delete meta.message;
    delete meta.timestamp;
    const hasMeta = Object.keys(meta).length > 0;
    const metaText = hasMeta ? " " + JSON.stringify(meta) : "";
    return info.timestamp + " " + info.level + ": " + info.message + metaText;
  })
);

const logger = createLogger({
  level: env.logLevel,
  defaultMeta: { service: "smartshop-lite" },
  format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
  transports: [
    new transports.Console({
      format: env.nodeEnv === "development" ? developmentFormat : format.json()
    })
  ]
});

module.exports = logger;