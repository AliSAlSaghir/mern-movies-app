import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetMovieQuery(movieId);
  const { userInfo } = useSelector(state => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async e => {
    e.preventDefault();

    try {
      await createReview({
        movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <>
      <div className="container px-4 mx-auto">
        <Link
          to="/"
          className="flex items-center mb-4 font-semibold text-white hover:underline"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Go Back
        </Link>

        <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
          <img
            src={`http://localhost:5000${movie?.image}`}
            alt={movie?.name}
            className="object-cover w-full h-auto rounded-lg shadow-lg md:w-1/2"
          />
          <div className="flex-1 mt-6 md:mt-0 md:ml-12">
            <h2 className="mb-4 text-4xl font-bold text-white">
              {movie?.name}
            </h2>
            <p className="mb-6 text-lg text-gray-400">{movie?.detail}</p>
            <p className="text-xl font-semibold text-teal-400">
              Releasing Date: {movie?.year}
            </p>
            <div className="mt-4">
              <h3 className="mb-2 text-lg font-semibold text-white">Cast:</h3>
              <ul className="text-gray-400">
                {movie?.cast.map((c, index) => (
                  <li key={index} className="mb-1">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
            refetch={refetch}
            movieId={movieId}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
