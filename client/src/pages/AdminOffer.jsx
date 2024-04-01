import React from 'react'
import AdminNavBar from '../components/AdminNavBar'
import AdminSideBar from '../components/AdminSideBar'
import { CgAddR } from "react-icons/cg";
import { FaPenToSquare } from "react-icons/fa6";

import { MdDeleteForever } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";






        

export default function AdminStock() {
    const stock=[
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        {ID:"F001",Fname:"apply",Qut:"200",price:"200.00",image:"apple.png",delet:"",update:""},
        
    ];

  return (
    <div className="">
      <div><AdminNavBar/></div>
        <div className="grid gap-4  lg:grid-cols-12 md:grid-cols-12 divide-x ">
        <div className="grid-col-1  lg:col-span-2 md:col-span-3 md:overflow-auto "><AdminSideBar/></div>
        <div className='grid-col-11 lg:col-span-10 md:col-span-9 h-max  text-black overflow-auto max-h-svh'>
            <h1 className="text-2xl ml-10 mt-10 inline-block">Stock Management </h1>
            <div className="float-right mr-10 mt-10">
            <a href=""><IoMdNotificationsOutline className="text-black text-3xl" /></a>
            </div>
            <div className="float-right mr-10 mt-10">
            <a href="/"><CgAddR  className="text-green-600 text-3xl"/></a>
            </div><br/>
            <div className="flex justify-center"><input type="text" placeholder="Search..." className="border border-gray-300 rounded-md px-4 py-2 w-96  focus:outline-none focus:border-blue-500"/></div>
            <br/>
      
   
            <div className="grid justify-items-center ml-10 mr-10 ">
                <table className="border-spacing-2">
                    <thead className="text-left">
                        <tr className="border-gray-950 bg-neutral-300 text-2x ">
                            <th className="w-48 h-12 rounded-tl-2xl border-b-2 p-2">Fruit ID</th>
                            <th className="w-48 h-12  border-b-2">Fruit Name</th>
                            <th className="w-48 h-12  border-b-2">Quantity</th>
                            <th className="w-48 h-12  border-b-2">Price</th>
                            <th className="w-48 h-12 border-b-2">Image</th>
                            <th className="w-32 h-12 border-b-2"></th>
                            <th className="w-32 h-12 border-b-2 rounded-tr-2xl"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {stock.map((item, index) => (
                        <tr key={index}>
                            <td className="h-12 border-b-2 p-2">{item.ID}</td>
                            <td className="border-b-2">{item.Fname}</td>
                            <td className="border-b-2">{item.Qut}</td>
                            <td className="border-b-2">{item.price}</td>
                            <td className="border-b-2">{item.image}</td>
                            <td className="border-b-2 w-32"><a href='/'><FaPenToSquare className="text-green-600 text-xl"/></a></td>
                            <td className="border-b-2 w-32"><a href='/'><MdDeleteForever className="text-red-600 text-2xl"/></a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
          </div>
        </div>      
    </div>
</div>
)}