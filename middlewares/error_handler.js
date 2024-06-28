const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

function errorHandler(err, req, res, next) {
  logger.log({ level: "error", message: err });
  const { message, status = 500 } = err;
  res.status(status).json({ error: message });
  next();
}

module.exports = errorHandler;
