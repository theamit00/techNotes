import {logEvents} from "./logger.js";

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );

  console.log(err.stack);

  const status = res.statusCode || 500; // server error
  const message = err.message || "Somthing went wrong!";

  res.status(status).json({ success: false, message });
};

export default errorHandler