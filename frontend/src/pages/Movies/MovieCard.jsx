import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={`http://localhost:5000${movie.image}`}
          alt={movie.name}
          className="w-[10rem] h-[15rem] rounded m-0 p-0 transition duration-200 ease-in-out transform group-hover:opacity-50"
        />
      </Link>

      <p className="absolute top-[85%] left-2 right-0 transition duration-200 ease-in-out group-hover:opacity-100 text-[1.2rem] opacity-0">
        {movie.name.length > 14
          ? movie.name.substring(0, 14) + "..."
          : movie.name}
      </p>
    </div>
  );
};

export default MovieCard;
