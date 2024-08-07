import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useGetAllGenresQuery } from "../../redux/api/genres";
import SliderUtil from "../../components/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopRatedMoviesQuery();
  const { data: genres } = useGetAllGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = genreId => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    movie => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-around">
      <nav className=" ml-[2rem] w-[10rem] self-start flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row mt-[3.5rem]">
        {genres?.map(g => (
          <button
            key={g._id}
            className={`transition duration-300 transform active:translate-y-1 ease-in-out hover:bg-gray-200 hover:text-gray-800  my-2 block py-3 px-3 rounded text-xl font-bold ${
              selectedGenre === g._id ? "bg-gray-200 text-gray-800" : ""
            }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
        <button
          className={`transition duration-300 transform active:translate-y-1 ease-in-out hover:bg-gray-200 hover:text-gray-800  my-2 block py-3 px-3 rounded text-xl font-bold ${
            selectedGenre === null ? "bg-gray-200 text-gray-800" : ""
          }`}
          onClick={() => handleGenreClick(null)}
        >
          All Genres
        </button>
      </nav>

      <section className="flex flex-col items-center justify-center w-full mr-14 lg:w-auto">
        <div className="w-full lg:w-[63rem] mb-8">
          <h1 className="mb-5 text-xl font-bold">For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full lg:w-[63rem] mb-8">
          <h1 className="mb-5 text-xl font-bold">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-full lg:w-[63rem] mb-[7rem]">
          <h1 className="mb-5 text-xl font-bold">Based On Genre</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
