import SliderUtil from "../../components/SliderUtil";
import { Link } from "react-router-dom";
import { useGetNewMoviesQuery } from "../../redux/api/movies";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col mt-[1.5rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
      <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0 mt-4">
        <Link
          to="/"
          className="block px-2 py-5 mb-1 text-xl font-bold transition duration-300 ease-in-out rounded hover:bg-teal-200 md:mb-4"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="block px-2 py-5 mb-1 text-xl font-bold transition duration-300 ease-in-out rounded hover:bg-teal-200 md:mb-2"
        >
          Browse Movies
        </Link>
      </nav>

      <div className="w-full md:w-[78%] mr-3 md:mr-14">
        <SliderUtil data={data} header={true} />
      </div>
    </div>
  );
};

export default Header;
