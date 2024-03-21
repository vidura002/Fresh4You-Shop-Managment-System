import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="">
          <h1 className="font-bold text-2xl sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Land</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-700" />
        </form>

        <ul className="flex gap-6">
          <Link to={""}>
            <li className="hidden sm:inline text-slate-700 hover:underline text-xl">
              Home
            </li>
          </Link>
          <Link to={"/About"}>
            <li className="hidden sm:inline text-slate-700 hover:underline text-xl">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline text-xl">
                Sign In
              </li>
            )}
          </Link>
          <Link to={"/ShoppingCart"}>
            <li className="hidden sm:inline text-slate-700 hover:underline text-xl">
              Cart
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
