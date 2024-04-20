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
        <a href="/AdminDashboard">  
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminDashboard' ? 'bg-green-30' : ''}`}>
            <IoHomeSharp className="inline-block" />
            <span>Dashboard</span>
          </li>
        </a>
        <a href="/AdminDashboard"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminUser' ? 'bg-green-30' : ''}`}>
            <FaUser className="inline-block" />
            <span>User Management</span>
          </li>
        </a>
        <a href="/AdminOffer"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminOffer' ? 'bg-green-30' : ''}`}>
            <GiFruitBowl className="inline-block" />
            <span>Fruit Offer Management</span>
          </li>
        </a>
        <a href="/AdminOrder"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminOrder' ? 'bg-green-30' : ''}`}>
            <GoListOrdered className="inline-block" />
            <span>Order Management</span>
          </li>
        </a>
        <a href="/AdminStock" className="ease-in duration-700"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminStock' ? 'bg-green-30' : ''}`}>
            <RiStockLine className="inline-block" />
            <span>Stock Management</span>
          </li>
        </a>
        <a href="/AdminDelivery"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminDelivery' ? 'bg-green-30' : ''}`}>
            <TbTruckDelivery className="inline-block" />
            <span>Delivery Details</span>
          </li>
        </a>
        <a href="/AdminSupplier"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminSupplier' ? 'bg-green-30' : ''}`}>
            <LiaLuggageCartSolid className="inline-block" />
            <span>Supplier Management</span>
          </li>
        </a>
        <a href="/AdminFeedback"> 
          <li className={`text-4x text-black font-bold p-3 hover:bg-green-30 ${activeLink === 'AdminFeedback' ? 'bg-green-30' : ''}`}>
            <MdFeedback className="inline-block" />
            <span>Feedback & Review</span>
          </li>
        </a>
      </ul>
    </div>
  );
}

export default AdminSideBar;
