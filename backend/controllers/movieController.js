import asyncHandler from "../middlewares/asyncHandler.js";
import Movie from "../models/Movie.js";

export const getAllMovies = asyncHandler(async (req, res, next) => {
  try {
    const movies = await Movie.find();
    if (!movies.length)
      return res.status(404).json({ message: "No movies found!" });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getMovie = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found!" });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const createMovie = asyncHandler(async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const movie = await newMovie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateMovie = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMovie)
      return res.status(404).json({ message: "Movie not found!" });
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const deleteMovie = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie)
      return res.status(404).json({ message: "Movie not found!" });
    res.status(200).json(deletedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const addMovieReview = asyncHandler(async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.movieId);
    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        r => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed)
        return res.status(400).json({ message: "Movie already reviewed!" });
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, review) => review.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review added successfully!" });
    } else {
      return res.status(404).json({ message: "Movie not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateMovieReview = asyncHandler(async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { movieId } = req.params;

    const movie = await Movie.findOneAndUpdate(
      {
        _id: movieId,
        "reviews.user": req.user._id,
      },
      {
        $set: {
          "reviews.$.rating": rating,
          "reviews.$.comment": comment,
          "reviews.$.updatedAt": Date.now(),
        },
      },
      { new: true }
    );

    if (!movie) {
      return res
        .status(404)
        .json({ message: "Movie not found or not reviewed by this user!" });
    }

    movie.rating =
      movie.reviews.reduce((acc, review) => review.rating + acc, 0) /
      movie.reviews.length;

    await movie.save();

    res.status(200).json({ message: "Review updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const deleteMovieReview = asyncHandler(async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const movie = await Movie.findById(req.params.movieId);
    if (movie) {
      const reviewIndex = movie.reviews.findIndex(
        r => r._id.toString() === reviewId
      );
      if (reviewIndex === -1)
        return res.status(400).json({ message: "Movie not reviewed!" });

      movie.reviews.splice(reviewIndex, 1);
      movie.numReviews = movie.reviews.length;
      movie.rating = movie.reviews.length
        ? movie.reviews.reduce((acc, review) => review.rating + acc, 0) /
          movie.reviews.length
        : 0;
      await movie.save();
      res.status(201).json({ message: "Review deleted successfully!" });
    } else {
      return res.status(404).json({ message: "Movie not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getNewMovies = asyncHandler(async (req, res, next) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    if (!newMovies.length)
      return res.status(404).json({ message: "No movies found!" });
    res.status(200).json(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getTopRatedMovies = asyncHandler(async (req, res, next) => {
  try {
    const topMovies = await Movie.find().sort({ numReviews: -1 }).limit(10);
    if (!topMovies.length)
      return res.status(404).json({ message: "No movies found!" });
    res.status(200).json(topMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getRandomMovies = asyncHandler(async (req, res, next) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    if (!randomMovies.length)
      return res.status(404).json({ message: "No movies found!" });
    res.status(200).json(randomMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
