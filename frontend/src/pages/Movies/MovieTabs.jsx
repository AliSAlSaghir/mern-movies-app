import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteMovieReviewMutation,
  useUpdateMovieReviewMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";
import StarRating from "../../components/StarRating";

const MovieTabs = ({
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  movie,
  movieId,
  refetch,
}) => {
  const [deleteReview] = useDeleteMovieReviewMutation();
  const [updateReview] = useUpdateMovieReviewMutation();
  const [editingReview, setEditingReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);

  const handleDeleteReview = async (movieId, reviewId) => {
    try {
      await deleteReview({ movieId, reviewId });
      toast.success("Review Deleted");
      refetch(); // Adjust if refetch is not available here
    } catch (error) {
      console.error("Error deleting review: ", error);
      toast.error("Failed to delete review");
    }
  };

  const handleEditClick = review => {
    setEditingReview(review);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
  };

  const handleUpdateReview = async () => {
    try {
      await updateReview({
        movieId,
        comment: updatedComment,
        rating: updatedRating, // Include updated rating
      });
      toast.success("Review Updated");
      setEditingReview(null);
      refetch(); // Adjust if refetch is not available here
    } catch (error) {
      console.error("Error updating review: ", error);
      toast.error("Failed to update review");
    }
  };

  return (
    <>
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="my-2">
              <label htmlFor="rating" className="block mb-2 text-xl">
                Your Rating:
                <div className="inline-block ml-2">
                  <StarRating rating={rating} setRating={setRating} />
                </div>
              </label>
            </div>

            <div className="my-2">
              <label htmlFor="comment" className="block mb-2 text-xl">
                Write Your Review
              </label>
              <textarea
                id="comment"
                rows="3"
                required
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="p-2 border rounded-lg xl:w-[40rem] text-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-teal-600 rounded-lg"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>
            Please <Link to="/login">Sign In</Link> to write a review
          </p>
        )}
      </section>

      <section className="mt-[3rem]">
        <div>{movie?.reviews.length === 0 && <p>No Reviews</p>}</div>

        <div>
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
                <span className="text-lg text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
                <span className="ml-2 text-gray-400">
                  ({review.rating} / 5)
                </span>
              </div>

              <p className="my-4">{review.comment}</p>

              {userInfo && userInfo._id === review.user && (
                <div className="flex space-x-4">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEditClick(review)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteReview(movie._id, review._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {editingReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Edit Review</h2>

            <div className="my-2">
              <label htmlFor="editRating" className="block mb-2 text-xl">
                Your Rating:
                <div className="inline-block ml-2">
                  <StarRating
                    rating={updatedRating}
                    setRating={setUpdatedRating}
                  />
                </div>
              </label>
            </div>

            <div className="my-2">
              <label htmlFor="editComment" className="block mb-2 text-xl">
                Edit Comment
              </label>
              <textarea
                id="editComment"
                rows="4"
                value={updatedComment}
                onChange={e => setUpdatedComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg"
                onClick={handleUpdateReview}
              >
                Update
              </button>
              <button
                className="px-4 py-2 text-black bg-gray-300 rounded-lg"
                onClick={() => setEditingReview(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieTabs;
