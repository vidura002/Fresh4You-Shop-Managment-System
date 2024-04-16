import React, { useState, useEffect } from "react";
import AdminNavBar from "../components/AdminNavBar";
import AdminSideBar from "../components/AdminSideBar";
import { CgAddR } from "react-icons/cg";
import { IoMdTrash } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import swt from "sweetalert2";

export default function AdminOffer() {
  const [offers, setOffers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/offer/GetAllOffers"
        );
        setOffers(response.data.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const handleConfirmClick = (itemId) => {
    swt
      .fire({
        title: "Are you sure?",
        text: "Delete this item from Stock",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel it",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:3000/api/offer/Delete/${itemId}`);
            swt.fire("Deleted!", `Item has been deleted`, "success");
          } catch (error) {
            console.error("Error deleting item:", error);
            swt.fire("Error", "Failed to delete item", "error");
          }
        } else if (result.dismiss === swt.DismissReason.cancel) {
          swt.fire("Cancelled", "This item is still in stock ", "error");
        }
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = offers.filter(
      (offer) =>
        offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.offerID.toString().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, offers]);

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
              value={searchTerm}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-4 py-2 w-96  focus:outline-none focus:border-blue-500"
            />
          </div>
          {searchResults.length === 0 && (
            <p className="text-center text-red-500">No Offer found.</p>
          )}
          <br />

          <div className="grid justify-items-center ml-10 mr-10 ">
            <table className="table-auto border-collapse w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Variant</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Update</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((offer, index) => (
                  <tr key={index}>
                    <td className="border-y px-4 py-2">{offer.offerID}</td>
                    <td className="border-y px-4 py-2">{offer.name}</td>
                    <td className="border-y px-4 py-2">Rs{offer.price}.00</td>
                    <td className="border-y px-4 py-2">{offer.variant}</td>
                    <td className="border-y px-4 py-2">{offer.quantity}</td>
                    <td className="border-y px-4 py-2">{offer.description}</td>
                    <td className="border-y px-4 py-2">
                      <img
                        src={offer.image}
                        alt={offer.name}
                        className="w-16 h-16 object-cover flex items-center justify-center rounded-2xl p-1"
                      />
                    </td>
                    <td className="border-y px-4 py-2">
                      <Link to="/UpdateOffer">
                        <IoIosCreate className="text-green-600 text-2xl" />
                      </Link>
                    </td>
                    <td className="border-y px-4 py-2">
                      <button onClick={() => handleConfirmClick(offer._id)}>
                        <IoMdTrash className="text-red-600 text-2xl" />
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
