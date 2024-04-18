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
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AdminOffer() {
  const [offers, setOffers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [zeroQuantityItems, setZeroQuantityItems] = useState(0);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/offer/GetAllOffers"
        );
        setOffers(response.data.data);
        setTotalItems(response.data.data.length);
        const zeroQuantityItemsCount = response.data.data.filter(
          (offer) => offer.quantity === 0
        ).length;
        setZeroQuantityItems(zeroQuantityItemsCount);
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
        text: "Delete this Offer item !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel it",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(
              `http://localhost:3000/api/offer/Delete/${itemId}`
            );
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

  //search
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

  //report genaration
  const generateReport = () => {
    const doc = new jsPDF();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const title = "Offer Report";
    const headers = [
      "ID",
      "Name",
      "Price",
      "Variant",
      "Quantity",
      "Description",
    ];
    const rows = searchResults.map((offer) => [
      offer.offerID,
      offer.name,
      `Rs${offer.price}.00`,
      offer.variant,
      offer.quantity,
      offer.description,
    ]);

    const styles = {
      headStyles: {
        fillColor: "#6B7280",
        textColor: "#FFFFFF",
        fontSize: 13,
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: "#111827",
        fontSize: 12,
      },
      alternateRowStyles: {
        fillColor: "#F3F4F6",
      },
    };

    doc.setFontSize(20);
    doc.text("Fresh4You Fruit shop", 14, 15);

    doc.setFontSize(16);
    doc.text(title, 14, 40);
    doc.setFontSize(12);
    doc.text(`Generated on: ${formattedDate}`, 14, 50);

    doc.autoTable({ head: [headers], body: rows, startY: 60, styles });

    doc.save(`Offer_report_${formattedDate}.pdf`);
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
          <br></br>
          <div className="text-center grid grid-cols-2 gap-4 mx-10 text-white">
            <div className="bg-green-600 rounded-md p-4 text-white">
              <p className="text-lg font-semibold">Total Offers</p>
              <p className="text-5xl font-bold">{totalItems}</p>
            </div>
            <div className="bg-red-600 rounded-md p-4">
              <p className="text-lg font-semibold">Sold out Offers</p>
              <p className="text-5xl font-bold">{zeroQuantityItems}</p>
            </div>
          </div>
          <br />
          <div className="text-right mr-10 mt-10">
            <button
              onClick={generateReport}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Generate report
            </button>
          </div>{" "}
          <br />
          <div className="grid justify-items-center ml-10 mr-10 ">
            <table
              id="offer-table"
              className="table-auto border-collapse w-full"
            >
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
                    <td className="border px-4 py-2">{offer.offerID}</td>
                    <td className="border px-4 py-2 w-48">{offer.name}</td>
                    <td className="border px-4 py-2">Rs{offer.price}.00</td>
                    <td className="border px-4 py-2">{offer.variant}</td>
                    <td className="border px-4 py-2 text-center">
                      {offer.quantity}
                    </td>
                    <td className="border px-4 py-2">{offer.description}</td>
                    <td className="border px-4 py-2 w-28">
                      <img
                        src={offer.image}
                        alt={offer.name}
                        className="w-16 h-16 object-cover flex justify-center rounded-2xl p-1"
                      />
                    </td>
                    <td className="border-y px-4 py-2 ">
                      <Link to="/UpdateOffer" className="flex justify-center">
                        <IoIosCreate className="text-green-600 text-2xl" />
                      </Link>
                    </td>
                    <td className="border-y px-4 py-2">
                      <button
                        onClick={() => handleConfirmClick(offer._id)}
                        className="flex justify-center"
                      >
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
