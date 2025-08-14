import express from "express";
import { createPath } from "../utils/path.js";
const router = express.Router();

router.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(createPath("views", "index.html"));
});
export default router;
