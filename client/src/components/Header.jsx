import { FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../images/logo.jpg';
import { LiaShoppingCartSolid } from 'react-icons/lia';
import { SlHandbag } from 'react-icons/sl';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <header className="bg-green-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 shadow-green-400">
        <Link to="/">
          <h1 className="font-bold text-7xl sm:text-xl flex flex-wrap mr-20 items-center space-x-1">
            <img src={Logo} alt="logo" className="w-14 h-14 rounded-full" />
            <span className="text-green-800">Fresh</span>
            <span className="text-green-900">4You</span>
          </h1>
        </Link>
        <ul className="flex gap-6">
        <NavLinkWithActiveCheck to="/" text="Home" isActive={
            location.pathname === '/'
          }/>
          <NavLinkWithActiveCheck to="/about" text="About" isActive={
            location.pathname === '/about' 
          }/>
          <NavLinkWithActiveCheck
          to="/FruitCatelog"
          text="Catalog"
          isActive={
            location.pathname === '/FruitCatelog' || location.pathname === '/OfferCatalog'
          }
        />
          <Link to={currentUser ? '/profile' : '/signin'}>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline text-xl">Sign In</li>
            )}
          </Link>
          <Link to="/cartproducts">
            <li className="hidden sm:inline text-slate-700 font-medium hover:underline text-3xl">
              <LiaShoppingCartSolid />
            </li>
          </Link>
          <li className="hidden sm:inline text-slate-700 font-medium hover:underline text-xl">
            |
          </li>
          <Link to="/handbag">
            <li className="hidden sm:inline text-slate-700 font-medium hover:underline text-2xl">
              <SlHandbag />
            </li>
          </Link>
        </ul>
      </div>
      <div className='h-1 bg-white'>

      </div>

     
    </header>
  );
}

function NavLinkWithActiveCheck({ to, text, isActive }) {
  return (
    <Link to={to}>
      <li
        className={
          isActive
            ? 'hidden sm:inline text-green-100 underline hover:underline text-xl font-bold'
            : 'hidden sm:inline text-green-950 hover:text-green-800 cursor text-xl'
        }
      >
        {text}
      </li>
    </Link>
  );
}