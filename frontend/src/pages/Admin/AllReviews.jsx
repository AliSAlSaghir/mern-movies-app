import StarRating from "../../components/StarRating";
import {
  useDeleteMovieReviewMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllReviews = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteReview] = useDeleteMovieReviewMutation();

  const handleDeleteReview = async (movieId, reviewId) => {
    try {
      await deleteReview({ movieId, reviewId });
      toast.success("Review Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting review: ", error);
    }
  };

  return (
    <div>
      {movies?.map(movie => (
        <section
          key={movie._id}
          className="flex flex-col items-center justify-center"
        >
          {movie?.reviews.map(review => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
            >
              <div className="flex items-center justify-between mb-2">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <div className="flex items-center mb-2">
                <StarRating
                  rating={review.rating}
                  setRating={() => {}}
                  readOnly={true}
                />
              </div>

              <p className="my-4">{review.comment}</p>

              <button
                className="mt-2 text-red-500"
                onClick={() => handleDeleteReview(movie._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default AllReviews;
