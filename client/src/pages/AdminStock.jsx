import React, { useState, useEffect } from "react";
import AdminNavBar from "../components/AdminNavBar";
import AdminSideBar from "../components/adminSideBar";
import { CgAddR } from "react-icons/cg";
import { FaPenToSquare } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";
import { BsCartX } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { BsGraphDownArrow } from "react-icons/bs";
import swt from "sweetalert2";

export default function AdminStock() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleConfirmClick = () =>{
    swt.fire({
      title: 'Are you sure?',
      text: "Delete this item from Stock",
      icon:"warning",
      showCancelButton: true,
      confirmButtonText:"Yes, delete it!",
      cancelButtonText: "Cancel it"
    }).then((result) => {
      if (result.isConfirmed){
        swt.fire(
          'Deleted!',
          `Item has been deleted`,
          'success'
        )
      }else if(result.dismiss === swt.DismissReason.cancel){
        swt.fire("Cancelled","This item is still in stock ",'error');
      }
    })
  }

  const stock = [
    {
      ID: "F001",
      Fname: "apple",
      Qut: "0",
      price: "200.00",
      image: "apple.png",
      delet: "",
      update: "",
    },
    {
      ID: "F002",
      Fname: "apply",
      Qut: "200",
      price: "200.00",
      image: "apple.png",
      delet: "",
      update: "",
    },
    {
      ID: "F003",
      Fname: "apply",
      Qut: "0",
      price: "200.00",
      image: "apple.png",
      delet: "",
      update: "",
    },
    {
      ID: "F004",
      Fname: "apply",
      Qut: "0",
      price: "200.00",
      image: "apple.png",
      delet: "",
      update: "",
    },
    {
      ID: "F005",
      Fname: "apply",
      Qut: "0",
      price: "200.00",
      image: "apple.png",
      delet: "",
      update: "",
    },
    {
      ID: "F006",
      Fname: "apply",
      Qut: "200",
      price: "200.00",
      image: "apple.png",
      delet: "",
      update: "",
    },
    {
      ID: "F001",
      Fname: "apply",
      Qut: "200",
      price: "200.00",
      image: "apple.png",
      delet: "",
      update: "",
    },
    {
      ID: "F001",
      Fname: "apply",
      Qut: "200",
      price: "200.00",
      image: "apple.png",
      delet: "",
      update: "",
    },
    
  ];

  const stockAbove100 = stock.filter((item) => item.Qut < 100);   //count  the number of items above 100 in

  const outOfStock = stock.filter((item) => item.Qut == 0);

  useEffect(() => {
    const count = stock.reduce((acc, item) => {
      if (parseInt(item.Qut) === 0) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setNotificationCount(count);

    const outOfStock = stock.filter((item) => parseInt(item.Qut) === 0);
    setOutOfStockItems(outOfStock);
  }, [stock]);

  useEffect(() => {
    const results = stock.filter(
      (item) =>
        item.ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.Fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="">
      <div>
        <AdminNavBar />
      </div>
      <div className="grid gap-4  lg:grid-cols-12 md:grid-cols-12 divide-x ">
        <div className="grid-col-1  lg:col-span-2 md:col-span-3 ">
          <AdminSideBar />
        </div>
        <div className="grid-col-11 lg:col-span-10 md:col-span-9 h-max  text-black overflow-auto max-h-svh">
          <h1 className="text-2xl ml-10 mt-10 inline-block font-bold">
            Stock Management{" "}
          </h1>
          <div className="float-right mr-10 mt-10">
            <IoMdNotificationsOutline className="text-black text-3xl" />
            <span>{notificationCount}</span>
          </div>
          <div className="float-right mr-10 mt-10">
            <a href="/AddStock">
              <CgAddR className="text-green-600 text-3xl cursor-copy" />
            </a>
          </div>
          <div className="float-right mr-10 mt-10">
            <a href="/AddStock">
              <RiAiGenerate className="text-green-600 text-3xl" />
            </a>
          </div>
          <br />
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-96  focus:outline-none focus:border-blue-500"
            />
          </div>
          <br />
          <hr />
          <div className="grid grid-cols-3 gap-10 p-8 ">
            <div className="grid grid-col-1 bg-green-500 p-5 rounded-2xl">
              <div className="grid grid-cols-2 ">
                <TiShoppingCart className="text-white text-4xl" />
                <span className="text-xl">Total Fruit Item</span>
                <p></p>
                <p className="text-6xl  font-bold text-white inline-block align-middle">
                  {stock.length}
                </p>
              </div>
            </div>
            <div className=" grid grid-col-2 bg-yellow-500 p-5 rounded-2xl">
              <div className="grid grid-cols-2">
                <BsGraphDownArrow className="text-white text-4xl" />
                <span className="text-xl">Total Fruit Item</span>
                <p></p>
                <p className="text-6xl  font-bold text-white inline-block align-middle ">
                  {stockAbove100.length}
                </p>
              </div>
            </div>
            <div className="grid grid-col-3 bg-red-600 p-5 rounded-2xl">
              <div className="grid grid-cols-2">
                <BsCartX className="text-white text-4xl" />
                <span className="text-xl text-slate-300">Out of Stock</span>
                <p></p>
                <span className="text-6xl font-bold text-slate-300 inline-block align-middle">
                  {outOfStock.length}
                </span>
              </div>
            </div>
          </div>
          {searchResults.length === 0 && <p className="text-2xl text-center">No results found.</p>}<br/>
          <div className="grid justify-items-center ml-10 mr-10 ">
            <table
              rowsPerPageOptions={[5, 10, 25, 50]}
              paginator
              rows={5}
              className="border-spacing-2 "
            >
              <thead className="text-left">
                <tr className="border-gray-950 bg-neutral-300 text-2x ">
                  <th className="w-48 h-12 rounded-tl-2xl border-b-2 p-2">
                    Fruit ID
                  </th>
                  <th className="w-48 h-12  border-b-2">Fruit Name</th>
                  <th className="w-48 h-12  border-b-2">Quantity</th>
                  <th className="w-48 h-12  border-b-2">Price</th>
                  <th className="w-48 h-12 border-b-2">Image</th>
                  <th className="w-8 h-12 border-b-2"></th>
                  <th className="w-8 h-12 border-b-2"></th>
                  <th className="w-8 h-12 border-b-2 rounded-tr-2xl"></th>
                </tr>
              </thead>
              <tbody>
                
                {searchResults.map((item, index) => (
                  <tr key={index}>
                    <td className="h-12 border-b-2 p-2">{item.ID}</td>
                    <td className="border-b-2">{item.Fname}</td>
                    <td className="border-b-2">{item.Qut}</td>
                    <td className="border-b-2">{item.price}</td>
                    <td className="border-b-2">{item.image}</td>
                    <td className="border-b-2 w-16">
                      <button onClick={handleConfirmClick}>
                        <IoMdEye className="text-black-600 text-2xl" />
                      </button>
                    </td>
                    <td className="border-b-2 w-16">
                      <a href="/">
                        <FaPenToSquare className="text-green-600 text-xl" />
                      </a>
                    </td>
                    <td className="border-b-2 w-16">
                    <button onClick={handleConfirmClick}>
                        <MdDeleteForever className="text-red-600 text-2xl" />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
