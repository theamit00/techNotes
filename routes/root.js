import express from "express";
import {pathToFile} from "../utils/path.js";
const router = express.Router();

router.get(/^\/$|\/index(.html)?/, (req, res) => {
  res.sendFile(pathToFile('views','index.html'))
});
export default router