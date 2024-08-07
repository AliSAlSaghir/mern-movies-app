import asyncHandler from "../middlewares/asyncHandler.js";
import Genre from "../models/Genre.js";

export const getAllGenres = asyncHandler(async (req, res, next) => {
  try {
    const genres = await Genre.find();
    if (!genres.length)
      return res.status(404).json({ message: "No genres found!" });

    res.status(200).json(genres);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

export const getGenre = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).json({ message: "Genre not found!" });

    res.status(200).json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

export const createGenre = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required!" });

    const existingGenre = await Genre.findOne({ name });
    if (existingGenre)
      return res.status(400).json({ message: "Genre already exists!" });

    const genre = await new Genre({ name }).save();
    res.status(200).json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

export const updateGenre = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).json({ message: "Genre not found!" });

    genre.name = name;
    const updatedGenre = await genre.save();

    res.status(200).json(updatedGenre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

export const deleteGenre = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedGenre = await Genre.findByIdAndDelete(id);
    if (!removedGenre)
      return res.status(404).json({ message: "Genre not found!" });
    res.status(200).json(removedGenre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});
