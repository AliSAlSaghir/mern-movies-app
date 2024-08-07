import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createGenre,
  updateGenre,
  deleteGenre,
  getAllGenres,
  getGenre,
} from "../controllers/genreController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, authorizeAdmin, createGenre)
  .get(getAllGenres);
router
  .route("/:id")
  .get(getGenre)
  .put(authenticate, authorizeAdmin, updateGenre)
  .delete(authenticate, authorizeAdmin, deleteGenre);

export default router;
