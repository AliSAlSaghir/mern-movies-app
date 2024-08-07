import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/banner.jpg";
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useGetAllGenresQuery } from "../../redux/api/genres";
import MovieCard from "./MovieCard";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useGetAllGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopRatedMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector(state => state.movies);

  // Extract movie years and find unique years
  const movieYears = data?.map(movie => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  // Apply cumulative filters whenever a filter changes
  useEffect(() => {
    const applyFilters = () => {
      let filtered = data || [];

      // Apply genre filter
      if (moviesFilter.selectedGenre) {
        filtered = filtered.filter(
          movie => movie.genre === moviesFilter.selectedGenre
        );
      }

      // Apply year filter
      if (moviesFilter.selectedYear) {
        filtered = filtered.filter(
          movie => movie.year === +moviesFilter.selectedYear
        );
      }

      // Apply sort filter
      if (moviesFilter.selectedSort) {
        switch (moviesFilter.selectedSort) {
          case "new":
            filtered = newMovies || [];
            break;
          case "top":
            filtered = topMovies || [];
            break;
          case "random":
            filtered = randomMovies || [];
            break;
          default:
            break;
        }
      }

      // Dispatch the filtered movies to the store
      dispatch(setFilteredMovies(filtered));
    };

    applyFilters();
  }, [moviesFilter, data, newMovies, topMovies, randomMovies, dispatch]);

  // Update filter change handlers
  const handleSearchChange = e => {
    const searchTerm = e.target.value;
    dispatch(setMoviesFilter({ ...moviesFilter, searchTerm }));

    // Apply the search filter together with other filters
    const filtered = data?.filter(movie =>
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch(setFilteredMovies(filtered));
  };

  const handleGenreClick = genreId => {
    dispatch(setMoviesFilter({ ...moviesFilter, selectedGenre: genreId }));
  };

  const handleYearChange = year => {
    dispatch(setMoviesFilter({ ...moviesFilter, selectedYear: year }));
  };

  const handleSortChange = sortOption => {
    dispatch(setMoviesFilter({ ...moviesFilter, selectedSort: sortOption }));
  };

  useEffect(() => {
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      <section>
        <div
          className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

          <div className="relative z-10 text-center text-white mt-[10rem]">
            <h1 className="mb-4 font-bold text-8xl">The Movies Hub</h1>
            <p className="text-2xl">
              Cinematic Odyssey: Unveiling the Magic of Movies
            </p>
          </div>

          <section className="absolute -bottom-[7rem]">
            <input
              type="text"
              className="w-[100%] h-[5rem] border px-10 outline-none rounded"
              placeholder="Search Movie"
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />
            <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
              <select
                className="p-2 text-black border rounded"
                value={moviesFilter.selectedGenre || ""}
                onChange={e => handleGenreClick(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres?.map(genre => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>

              <select
                className="p-2 ml-4 text-black border rounded"
                value={moviesFilter.selectedYear || ""}
                onChange={e => handleYearChange(e.target.value)}
              >
                <option value="">Year</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                className="p-2 ml-4 text-black border rounded"
                value={moviesFilter.selectedSort || ""}
                onChange={e => handleSortChange(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="new">New Movies</option>
                <option value="top">Top Movies</option>
                <option value="random">Random Movies</option>
              </select>
            </section>
          </section>
        </div>

        <section className="mt-[12rem] mb-[2rem] w-screen flex justify-center items-center flex-wrap">
          {filteredMovies?.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </section>
      </section>
    </div>
  );
};

export default AllMovies;
