
import React from "react";
import AdminSideBar from "../components/AdminSideBar";
import AdminNavBar from "../components/AdminNavBar";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { GoListOrdered } from "react-icons/go";
import { RiStockLine } from "react-icons/ri";
import { MdFeedback } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { RiLogoutCircleLine } from "react-icons/ri";


function AdminDashboard() {
  return (
    <div className="bg-white min-h-screen md:min-h-screen lg:min-h-screen 2xl:min-h-screen">
      <div>
        <AdminNavBar />
      </div>
      {/*<div className="grid grid gap-4 sm:grid-cols-12">
          <div className="col-span-2"><AdminSideBar/></div>
          <div className="col-span-10 h-max text-black">*/}
      <div className="pt-4">
        <h1 className="text-4xl text-center font-black">ADMIN DASHBOARD</h1>
        <br />
        <hr />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 p-10 gap-10 m-5 ">
        <Link to="/usersList">
          <div className="p-10 bg-green-200 w-64 h-48 rounded-2xl hover:bg-green-300 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
            <div className="flex justify-center items-center">
              <FaUser className="text-6xl" />
            </div>
            <h1 className="text-2xl">User Management</h1>
          </div>
        </Link>
        <Link to="/AdminOffer">
          <div className="p-10 bg-yellow-200 w-64 h-48 rounded-2xl hover:bg-yellow-300 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
            <div className="flex justify-center items-center">
              <GiFruitBowl className="text-6xl" />
            </div>
            <h1 className="text-2xl">Fruit Offer Management</h1>
          </div>
        </Link>
        <Link to="/Orders">
          <div className="p-10 bg-blue-200 w-64 h-48 rounded-2xl hover:bg-blue-300 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
            <div className="flex justify-center items-center">
              <GoListOrdered className="text-6xl" />
            </div>
            <h1 className="text-2xl ">Order Management</h1>
          </div>
        </Link>
        <Link to="/AdminStock">
          <div className="p-10 bg-orange-20 w-64 h-48 rounded-2xl hover:bg-brown-400 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
            <div className="flex justify-center items-center">
              <RiStockLine className="text-6xl" />
            </div>
            <h1 className="text-2xl ">Stock Management</h1>
          </div>
        </Link>
        <Link to="/">
          <div className="p-10 bg-orange-200 w-64 h-48 rounded-2xl hover:bg-orange-300 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
            <div className="flex justify-center items-center">
              <TbTruckDelivery className="text-6xl" />
            </div>
            <h1 className="text-2xl ">Delivery Management</h1>
          </div>
        </Link>
        <Link to="/">
          <div className="p-10 bg-purple-200  w-64 h-48 rounded-2xl hover:bg-purple-300 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
            <div className="flex justify-center items-center">
              <LiaLuggageCartSolid className="text-6xl" />
            </div>
            <h1 className="text-2xl">Supplier Management</h1>
          </div>
        </Link>
        <Link to="/">
          <div className="p-10 bg-red-200 w-64 h-48 rounded-2xl hover:bg-red-300 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
            <div className="flex justify-center items-center">
              <MdFeedback className="text-6xl" />
            </div>
            <h1 className="text-2xl">Feedback & Rewiew</h1>
          </div>
        </Link>
        <Link to="/Signin">
          <div className="p-10 bg-red-400 w-64 h-48 rounded-2xl hover:bg-red-500 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
            <div className="flex justify-center items-center">
              <RiLogoutCircleLine className="text-6xl" />
            </div>
            <h1 className="text-2xl">Logout</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
