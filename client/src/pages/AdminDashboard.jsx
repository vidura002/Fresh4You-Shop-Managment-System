import React from 'react'
import AdminSideBar from '../components/adminSideBar'
import AdminNavBar from '../components/AdminNavBar'
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { GoListOrdered } from "react-icons/go";
import { RiStockLine } from "react-icons/ri";
import { MdFeedback } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaLuggageCartSolid } from "react-icons/lia";




function AdminDashboard() {
  return (
    <div>
        <div><AdminNavBar/></div>
        <div className="grid grid gap-4 sm:grid-cols-12">
          <div className="col-span-2"><AdminSideBar/></div>
          <div className="col-span-10 h-max text-black">
              <div className="grid grid-cols-4 p-20 gap-10 ">
              <Link to="/AdminStock">
                <div className="p-10 bg-green-500 w-64 h-48 rounded-2xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 font-bold text-center text-xl shadow-2xl">
                  <div className="flex justify-center items-center">
                    <FaUser className="text-6xl"></FaUser>
                  </div>
                    <h1>User Management</h1>
                </div>
              </Link>
              <Link to="/AdminStock">
                <div className="p-10 bg-green-500 w-64 h-48 rounded-2xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
                  <h1>Fruit Offer Management</h1>
                </div>
              </Link>
                <Link to="/AdminStock">
                <div className="p-10 bg-green-500 w-64 h-48 rounded-2xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
                  <h1>Order Management</h1>
                </div>
              </Link>
              <Link to="/AdminStock">
                <div className="p-10 bg-green-500 w-64 h-48 rounded-2xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
                  <h1>Stock Management</h1>
                </div>
              </Link>
              <Link to="/AdminStock">
                <div className="p-10 bg-green-500 w-64 h-48 rounded-2xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
                  <h1>Delivery Management</h1>
                  </div >
              </Link>
              <Link to="/AdminStock">
                <div className="p-10 bg-green-500  w-64 h-48 rounded-2xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 col-start-2 col-end-3">
                  <h1>Supplier Management</h1>
                </div>
              </Link>
              <Link to="/AdminStock">
                <div className="p-10 bg-green-500 w-64 h-48 rounded-2xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
                  <h1>Feedback & Rewiew</h1>
                </div>
              </Link>
              </div>
            </div>
            </div>
    </div>
        
        
    
  )
}

export default AdminDashboard