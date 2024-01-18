const { logEvents } = require("./logger");

// this middleware overwrites default error handler
const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}:${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );

  const status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({ message: err.message });
  next();
};

module.exports = { errorHandler };
