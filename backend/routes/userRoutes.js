import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(authenticate, authorizeAdmin, getAllUsers)
  .post(createUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateCurrentUser);

export default router;
