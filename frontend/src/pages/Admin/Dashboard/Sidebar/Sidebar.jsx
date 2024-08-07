import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed flex h-screen mt-10 -translate-y-10">
      <aside className="flex-shrink-0 text-white w-60">
        <ul className="py-8">
          <li className="text-lg -translate-x-6 rounded-full bg-gradient-to-b from-green-500 to-lime-400">
            <Link
              to="/admin/movies/dashboard"
              className="block p-2 py-4 mb-5 ml-20"
            >
              Dashboard
            </Link>
          </li>
          <li className="text-lg -translate-x-6 rounded-full hover:bg-gradient-to-b from-green-500 to-lime-400">
            <Link
              to="/admin/movies/create"
              className="block p-2 py-4 mb-5 ml-20"
            >
              Create Movie
            </Link>
          </li>
          <li className="text-lg -translate-x-6 rounded-full hover:bg-gradient-to-b from-green-500 to-lime-400">
            <Link
              to="/admin/movies/genres"
              className="block p-2 py-4 mb-5 ml-20"
            >
              Create Genre
            </Link>
          </li>
          <li className="text-lg -translate-x-6 rounded-full hover:bg-gradient-to-b from-green-500 to-lime-400">
            <Link
              to="/admin/movies/movies-list"
              className="block p-2 py-4 mb-5 ml-20"
            >
              Update Movie
            </Link>
          </li>
          <li className="text-lg -translate-x-6 rounded-full hover:bg-gradient-to-b from-green-500 to-lime-400">
            <Link
              to="/admin/movies/reviews"
              className="block p-2 py-4 mb-5 ml-20"
            >
              Reviews
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
