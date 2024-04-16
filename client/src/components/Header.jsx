import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../images/logo.jpg";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { SlHandbag } from "react-icons/sl";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-green-400 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
          <h1 className="font-bold text-7xl sm:text-xl flex flex-wrap mr-20 items-center space-x-1">
            <img src={Logo} alt="logo" className="w-14 h-14 rounded-full " />
            <span className="text-green-700">Fresh</span>
            <span className="text-green-800">4You</span>
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
          <Link to={"/"}>
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
          <Link to={"/shoppingcart"}>
            <li className="hidden sm:inline text-slate-700 font-medium hover:underline text-3xl">
              <LiaShoppingCartSolid />
            </li>
          </Link>
          <li className="hidden sm:inline text-slate-700 font-medium hover:underline text-xl">
            |
          </li>
          <Link to={"/user-orders"}>
            <li className="hidden sm:inline text-slate-700 font-medium hover:underline text-2xl">
              <SlHandbag />
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
