import { useState } from "react";

const StarRating = ({ rating, setRating, readOnly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <button
            key={ratingValue}
            type="button"
            className={`text-2xl ${
              ratingValue <= (hover || rating)
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
            onClick={() => (readOnly ? {} : setRating(ratingValue))}
            onMouseEnter={() => (readOnly ? {} : setHover(ratingValue))}
            onMouseLeave={() => (readOnly ? {} : setHover(0))}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
