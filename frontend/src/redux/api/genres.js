import { apiSlice } from "./apiSlice";
import { GENRES_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createGenre: builder.mutation({
      query: newGenre => ({
        url: `${GENRES_URL}`,
        method: "POST",
        body: newGenre,
        credentials: "include",
      }),
    }),
    getGenre: builder.query({
      query: id => `${GENRES_URL}/${id}`,
    }),
    updateGenre: builder.mutation({
      query: ({ id, genre }) => ({
        url: `${GENRES_URL}/${id}`,
        method: "PUT",
        body: genre,
        credentials: "include",
      }),
    }),
    deleteGenre: builder.mutation({
      query: id => ({
        url: `${GENRES_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getAllGenres: builder.query({
      query: () => `${GENRES_URL}`,
    }),
  }),
});

export const {
  useGetAllGenresQuery,
  useGetGenreQuery,
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} = genreApiSlice;
