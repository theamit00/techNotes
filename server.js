import express from "express";
import path from "path";
import root from "./routes/root.js";
import { logger } from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import corsOptions from "./config/corsOptions.js";

const app = express();

const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
