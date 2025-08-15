import { logEvents } from "./logger.js";

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );

  console.log(err.stack);
  const status = err.statusCode || 500; // server error
  const message = status < 500 ? err.message : "Internal server error";

  res.status(status).json({ success: false, message });
};

export default errorHandler;
