import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { createPath } from "../utils/path.js";

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}`;
  const outputFilePath = createPath("logs", logFileName);

  try {
    if (!fs.existsSync(createPath("logs"))) {
      await fsPromises.mkdir(createPath("logs"));
    }

    await fsPromises.appendFile(outputFilePath, logItem);
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.url}`)
  next();
};

export {logEvents ,logger };
