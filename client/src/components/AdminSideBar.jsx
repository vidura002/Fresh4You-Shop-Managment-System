import React from 'react'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { GoListOrdered } from "react-icons/go";
import { RiStockLine } from "react-icons/ri";
import { MdFeedback } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaLuggageCartSolid } from "react-icons/lia";
import adminPage from "../images/Admin-img.jpeg"

function AdminSideBar()  {
  return (
    <div className="w-64 bg-Gray-20 fixed h-full m-30">
      <div className="h-50 flex justify-center p-5"> 
        <img src={adminPage} alt="logo" className='rounded-full w-10 h-10  '/>
      </div>
      <hr/>
        <ul>
        <a href="/AdminDashboard">  
        <li className="text-4x text-black font-bold p-3 hover:bg-green-30">
          <IoHomeSharp className="inline-block"></IoHomeSharp>{' '}
          <span>Dashboard</span>
        </li></a>
        <a href="/AdminDashboard"> 
        <li className="text-4x text-black font-bold p-3 hover:bg-green-30">
            <FaUser className="inline-block"></FaUser>{' '}
            <span>User Management</span>
          </li></a>
          <a href="/AdminOffer"> 
          <li className="text-4x text-black font-bold p-3 hover:bg-green-30 ease-in-out duration-300">
            <GiFruitBowl className="inline-block"></GiFruitBowl>{' '}
            <span>Fruit Offer Management</span>
          </li></a>
          <a href="/AdminDashboard"> 
          <li className="text-4x text-black font-bold p-3 hover:bg-green-30">
            <GoListOrdered className="inline-block"></GoListOrdered>{' '}
            <span>Order Management</span>
          </li></a>
          <a href="/AdminStock" className="ease-in duration-700"> 
          <li className="text-4x text-black font-bold p-3 hover:bg-green-30">
            <RiStockLine className="inline-block"></RiStockLine>{' '}
            <span>Stock Management</span>
          </li></a>
          <a href="/AdminDashboard"> 
          <li className="text-4x text-black font-bold p-3 hover:bg-green-30">
            <TbTruckDelivery className="inline-block"></TbTruckDelivery>{' '}
            <span>Delivery Details</span>
          </li></a>
          <a href="/AdminDashboard"> 
          <li className="text-4x text-black font-bold p-3 hover:bg-green-30">
            <LiaLuggageCartSolid className="inline-block"></LiaLuggageCartSolid>{' '}
            <span>Supplier Management</span>
          </li></a>
          <a href="/AdminDashboard"> 
          <li className="text-4x text-black font-bold p-3 hover:bg-green-30">
            <MdFeedback className="inline-block"></MdFeedback>{' '}
            <span>Feedback & Review</span>
          </li></a>
        </ul>

       





    </div>
  )
}

export default AdminSideBar