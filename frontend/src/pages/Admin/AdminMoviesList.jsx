import { Link, useLocation } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useEffect } from "react";

const AdminMoviesList = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <div className="container mx-[4.3rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-2xl font-bold h-12">
            All Movies ({movies?.length})
          </div>

          <div className="flex flex-wrap justify-start p-[2.5rem] w-[75rem] gap-x-10 gap-y-[6rem]">
            {movies?.map(movie => (
              <div
                key={movie._id}
                className="block overflow-hidden w-[15rem] h-[30rem]"
              >
                <div
                  key={movie._id}
                  className="overflow-hidden rounded shadow-lg "
                >
                  <img
                    src={`http://localhost:5000${movie.image}`}
                    alt={movie.name}
                    className="object-contain w-full h-[17rem]"
                  />
                  <div className="flex justify-center px-3 pt-3 pb-2 border border-gray-400">
                    <div className="mb-2 text-xl font-bold">
                      {movie.name.length > 17
                        ? movie.name.substring(0, 17) + "..."
                        : movie.name}
                    </div>
                  </div>

                  <p className="w-full h-[5rem] mb-3 mt-1 text-base text-gray-700">
                    {movie.detail.length > 80
                      ? movie.detail.substring(0, 80) + "..."
                      : movie.detail}
                  </p>
                </div>

                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="flex items-center justify-center"
                >
                  <button className="px-4 py-2 font-bold text-white bg-teal-500 rounded hover:bg-teal-700">
                    Update Movie
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
