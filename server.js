import express from "express";
import path from "path";
import root from "./routes/root.js";
import { logEvents, logger } from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import {error} from "console";

const app = express();

const PORT = process.env.PORT || 8080;

connectDB();

app.use(logger);
app.use(cors(corsOptions));

// Global middleware
app.use(express.json()); // to recieve and parse the json data
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

app.use("/", root);

// handle invalid routes
app.all(/.*/, (req, res) => {
  res.status(400);
  if (req.accepts("html")) {
    res.sendFile(path.join(path.resolve(), "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Handle server side error
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Database Connected");
  app.listen(PORT, () => {
    console.log(`Server is runing on http://localhost:${PORT}`);
  });
});

mongoose.connection.on('error',(err)=>{
  console.log(err);
  logEvents(`${err.no} : ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
