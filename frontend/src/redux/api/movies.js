import { MOVIES_URL, UPLOADS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllMovies: builder.query({
      query: () => `${MOVIES_URL}`,
    }),
    createMovie: builder.mutation({
      query: newMovie => ({
        url: `${MOVIES_URL}`,
        method: "POST",
        body: newMovie,
        credentials: "include",
      }),
    }),
    getMovie: builder.query({
      query: id => `${MOVIES_URL}/${id}`,
    }),
    updateMovie: builder.mutation({
      query: ({ updatedMovie, id }) => ({
        url: `${MOVIES_URL}/${id}`,
        method: "PUT",
        body: updatedMovie,
        credentials: "include",
      }),
    }),
    deleteMovie: builder.mutation({
      query: id => ({
        url: `${MOVIES_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    addMovieReview: builder.mutation({
      query: ({ rating, comment, movieId }) => ({
        url: `${MOVIES_URL}/${movieId}/reviews`,
        method: "POST",
        body: { rating, comment },
        credentials: "include",
      }),
    }),
    updateMovieReview: builder.mutation({
      query: ({ rating, comment, movieId }) => ({
        url: `${MOVIES_URL}/${movieId}/reviews`,
        method: "PUT",
        body: { rating, comment },
        credentials: "include",
      }),
    }),
    deleteMovieReview: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIES_URL}/${movieId}/reviews/${reviewId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getNewMovies: builder.query({
      query: () => `${MOVIES_URL}/getNewMovies`,
    }),
    getTopRatedMovies: builder.query({
      query: () => `${MOVIES_URL}/getTopRatedMovies`,
    }),
    getRandomMovies: builder.query({
      query: () => `${MOVIES_URL}/getRandomMovies`,
    }),
    uploadImage: builder.mutation({
      query: formData => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useGetMovieQuery,
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopRatedMoviesQuery,
  useUpdateMovieMutation,
  useCreateMovieMutation,
  useDeleteMovieMutation,
  useAddMovieReviewMutation,
  useDeleteMovieReviewMutation,
  useUpdateMovieReviewMutation,
  useUploadImageMutation,
} = movieApiSlice;
