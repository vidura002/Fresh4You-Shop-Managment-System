import AdminNavBar from "../components/AdminNavBar";
import AdminSideBar from "../components/AdminSideBar";
import { CgAddR } from "react-icons/cg";
import { IoMdTrash } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import React, { useState } from "react";

export default function AdminStock() {
  const [offers, setOffers] = useState([
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
    {
      id: "Offer001",
      name: "Bascket_01",
      price: "1800.00",
      variant: "M",
      quantity: "2",
      category: "Imported",
      description: "small, taste yummy fruit",
      image: "img.png",
      delet: "",
      update: "",
    },
  ]);

  return (
    <div className="">
      <div>
        <AdminNavBar />
      </div>
      <div className="grid gap-4  lg:grid-cols-12 md:grid-cols-12 divide-x ">
        <div className="grid-col-1  lg:col-span-2 md:col-span-3 md:overflow-auto ">
          <AdminSideBar />
        </div>
        <div className="grid-col-11 lg:col-span-10 md:col-span-9 h-max  text-black overflow-auto max-h-svh">
          <h1 className="text-2xl ml-10 mt-10 inline-block">
            Offer Management/home{" "}
          </h1>

          <div className="float-right mr-10 mt-10">
            <a href="/OfferNotification">
              <IoMdNotificationsOutline className="text-black text-3xl" />
            </a>
          </div>
          <div className="float-right mr-10 mt-10">
            <a href="/CreateOffer">
              <CgAddR className="text-green-600 text-3xl" />
            </a>
          </div>
          <br />
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-4 py-2 w-96  focus:outline-none focus:border-blue-500"
            />
          </div>
          <br />

          <div className="grid justify-items-center ml-10 mr-10 ">
            <table className="border-spacing-2">
              <thead className="text-left">
                <tr className="border-gray-950 bg-neutral-300 text-2x ">
                  <th className="w-48 h-12 rounded-tl-2xl border-b-2 p-2">
                    id
                  </th>
                  <th className="w-48 h-12  border-b-2">name</th>
                  <th className="w-48 h-12  border-b-2">price</th>
                  <th className="w-48 h-12  border-b-2">variant</th>
                  <th className="w-48 h-12 border-b-2">quantity</th>
                  <th className="w-48 h-12  border-b-2">category</th>
                  <th className="w-32 h-12 border-b-2">description</th>
                  <th className="w-48 h-12 border-b-2">Image</th>
                  <th className="w-32 h-12 border-b-2">Update</th>
                  <th className="w-32 h-12 border-b-2 rounded-tr-2xl">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {offers.map((item, index) => {
                  return <tr key={index}>
                    <td className="h-12 border-b-2 p-2">{item.id}</td>
                    <td className="border-b-2">{item.name}</td>
                    <td className="border-b-2">{item.price}</td>
                    <td className="border-b-2">{item.variant}</td>
                    <td className="border-b-2">{item.quantity}</td>
                    <td className="border-b-2">{item.category}</td>
                    <td className="border-b-2">{item.description}</td>
                    <td className="border-b-2">{item.image}</td>
                    <td className="border-b-2 w-32">
                      <a href="/UpdateOffer">
                        <IoIosCreate className="text-green-600 text-2xl" />
                      </a>
                    </td>
                    <td className="border-b-2 w-32">
                      <a href="/">
                        <IoMdTrash className="text-red-600 text-2xl" />
                      </a>
                    </td>
                  </tr>
               })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
