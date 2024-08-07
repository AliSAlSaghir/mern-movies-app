import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createMovie,
  addMovieReview,
  deleteMovie,
  deleteMovieReview,
  getAllMovies,
  getMovie,
  getNewMovies,
  getRandomMovies,
  getTopRatedMovies,
  updateMovie,
  updateMovieReview,
} from "../controllers/movieController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllMovies)
  .post(authenticate, authorizeAdmin, createMovie);

router.route("/getNewMovies").get(getNewMovies);
router.route("/getTopRatedMovies").get(getTopRatedMovies);
router.route("/getRandomMovies").get(getRandomMovies);

router
  .route("/:id")
  .get(getMovie)
  .put(authenticate, authorizeAdmin, updateMovie)
  .delete(authenticate, authorizeAdmin, deleteMovie);

router
  .route("/:movieId/reviews")
  .post(authenticate, addMovieReview)
  .put(authenticate, updateMovieReview);
router
  .route("/:movieId/reviews/:reviewId")
  .delete(authenticate, deleteMovieReview);

export default router;
