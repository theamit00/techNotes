import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
