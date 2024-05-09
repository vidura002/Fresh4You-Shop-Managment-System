import React, { useState, useEffect } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { GoListOrdered } from "react-icons/go";
import { RiStockLine } from "react-icons/ri";
import { MdFeedback } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaLuggageCartSolid } from "react-icons/lia";
import adminPage from "../images/Admin-img.jpeg";
import { Link } from 'react-router-dom';

function AdminSideBar() {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname.split('/').pop();
    setActiveLink(currentPath);
  }, []);

  return (
    <div className="w-64 bg-Gray-20 h-dvh m-30">
      <div className="h-50 flex justify-center p-5"> 
        <img src={adminPage} alt="logo" className='rounded-full w-10 h-10  '/>
      </div>
      <hr />
      <ul>
        <Link to="/AdminDashboard">  
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminDashboard' ? 'bg-green-30' : ''}`}>
            <IoHomeSharp className="inline-block" />
            <span>Dashboard</span>
          </li>
        </Link>
        <Link to="/AdminDashboard"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminUser' ? 'bg-green-30' : ''}`}>
            <FaUser className="inline-block" />
            <span>User Management</span>
          </li>
        </Link>
        <Link to="/AdminOffer"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminOffer' ? 'bg-green-30' : ''}`}>
            <GiFruitBowl className="inline-block" />
            <span>Fruit Offer Management</span>
          </li>
        </Link>
        <Link to="/orders"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'orders' ? 'bg-green-30' : ''}`}>
            <GoListOrdered className="inline-block" />
            <span>Order Management</span>
          </li>
        </Link>
        <Link to="/AdminStock" className="ease-in duration-700"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminStock' ? 'bg-green-30' : ''}`}>
            <RiStockLine className="inline-block" />
            <span>Stock Management</span>
          </li>
        </Link>
        <Link to="/DAdm"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'DAdm' ? 'bg-green-30' : ''}`}>
            <TbTruckDelivery className="inline-block" />
            <span>Delivery Details</span>
          </li>
        </Link>
        <Link to="/AdminDashboard"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminDashboard' ? 'bg-green-30' : ''}`}>
            <LiaLuggageCartSolid className="inline-block" />
            <span>Supplier Management</span>
          </li>
        </Link>
        <Link to="/AdminDashboard"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminDashboard' ? 'bg-green-30' : ''}`}>
            <MdFeedback className="inline-block" />
            <span>Feedback & Review</span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default AdminSideBar;
