function errorHandler(err, req, res, next) {
  logger.log({ level: "error", message: err });
  const { message, status = 500 } = err;
  res.status(status).json({ error: message });
  next();
}

module.exports = errorHandler;
