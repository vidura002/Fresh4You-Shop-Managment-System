import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Logo from '../images/logo.jpg'
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-7 pb-4">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    <div className="w-full md:w-auto mb-4 md:mb-0 flex justify-center items-center">
    <h1 className='font-bold text-7xl sm:text-xl flex flex-wrap mr-20 items-center space-x-1'>
            <img src={Logo} alt="logo" className='w-14 h-14 rounded-full '/>
            <span className='text-green-700'>Fresh</span>
            <span className='text-green-800'>4You</span>
        </h1>
    </div>
    <div className="w-full md:w-auto mb-4 md:mb-0">
      <h2 className="text-2xl font-semibold  underline decoration-green-600	 text-white">Quick Links</h2>
      <ul>
        <li className="mb-2 md:mb-4"><Link to={"/FruitCategory"} className="hover:text-green-500 ">Home</Link></li>
        <li className="mb-2 md:mb-4"><Link to={"#about"} className="hover:text-green-500">Benifit</Link></li>
        <li className="mb-2 md:mb-4"><Link to={"/"} className="hover:text-green-500">About Us</Link></li>
        <li className="mb-2 md:mb-4"><Link to={"/DeliveryPlaces"} className="hover:text-green-500">Where We Deliver</Link></li>
      </ul>
    </div>
    <div className="flex flex-col gap-4">
    <h2 className="text-2xl font-semibold mb-2 underline decoration-green-600	 text-white">Quick Links</h2>
      <div className="flex gap-2 items-center">
        <FaPhone className="text-xl" />
        <p>+94 763667845</p>
      </div>
      <div className="flex gap-2 items-center">
        <FaEnvelope className="text-xl" />
        <p>fresh4you@gmail.com</p>
      </div>
      <div className="flex gap-2 items-center">
        <FaMapMarkerAlt className="text-xl" />
        <p>Pittugoda</p>
      </div>
    </div>
    <div className="w-full md:w-auto mb-4 md:mb-0 place-content-center">
      <div className="flex space-x-4">
        <a href="#" className="text-gray-100 hover:text-green-500 text-4xl"><FaWhatsapp /></a>
        <a href="#" className="text-gray-100 hover:text-blue-500 text-4xl"><FaFacebook /></a>
        <a href="#" className="text-gray-100 hover:text-pink-500 text-4xl"><FaInstagram /></a>
      </div>
      <br/>
      <Link to={"/"}><button className="bg-green-500 text-white py-2 px-4 rounded-md ml-4 mt-2 md:mt-0 hover:bg-green-600">Feedback</button></Link>
    </div>
  </div>
  <hr className="my-5"/>
  <div className="text-center">
    <p className="text-gray-500">&copy; Copyright All Rights Reserved</p>
  </div>
</footer>

  );
};

export default Footer;
