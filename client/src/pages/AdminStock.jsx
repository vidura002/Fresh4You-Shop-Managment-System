import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavBar from "../components/AdminNavBar";
import AdminSideBar from "../components/AdminSideBar";
import { CgAddR } from "react-icons/cg";
import { FaPenToSquare } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";
import { BsCartX } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { BsGraphDownArrow } from "react-icons/bs";
import swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AdminStock() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsBelow100, setItemsBelow100] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [outOfStockItemCount, setOutOfStockItemCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleConfirmClick = (itemId) => {
    swal
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
            await axios.delete(`http://localhost:3000/api/Stock/Delete/${itemId}`);
            swal.fire("Deleted!", `Item has been deleted`, "success");
          } catch (error) {
            console.error("Error deleting item:", error);
            swal.fire("Error", "Failed to delete item", "error");
          }
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swal.fire("Cancelled", "This item is still in stock ", "error");
        }
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/Stock/getAll"
        );
        console.log("API:", response.data); 
        setData(response.data.data); 

        const below100 = response.data.data.filter(
          (item) => item.FruitQuantity < 100
        );
        setItemsBelow100(below100.length);

        setRowCount(response.data.data.length);

        const outOfStockItems = response.data.data.filter(
          (item) => item.FruitQuantity <= 0
        );
        setOutOfStockItemCount(outOfStockItems.length);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = data.filter(
      (item) =>
        item.FruitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.FruitID.toString().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm, data]);

  const generateReport = () => {
    const doc = new jsPDF();
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); 
    const shopName = "Fresh4You Fruit shop";
    const title = "Stock Report";
    const headers = ["Fruit ID", "Fruit Name", "Quantity", "Price"];
    const rows = searchResults.map((item) => [
      item.FruitID,
      item.FruitName,
      `${item.FruitQuantity} kg`,
      `Rs.${item.price}.00`,
    ]);
  
    const styles = {
      headStyles: {
        fillColor: "#4CAF50", 
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
      }
    };
  
    const logo = new Image();
    logo.src = '../src/images/report.png'; 
    doc.addImage(logo, 'PNG', 10, 10, 20, 20);
  
    doc.setFontSize(20);
    doc.text(shopName, 30, 23);
    doc.setFontSize(16);
    doc.text(title, 14, 40);
    doc.setFontSize(12);
    doc.text(`Generated on: ${formattedDate}`, 14, 50); 
    doc.autoTable({ head: [headers], body: rows, startY: 60, styles });
  
  
    doc.save(`Stock_Report_${formattedDate}.pdf`);
  
    swal.fire({
      icon: "success",
      title: "Report Generated",
      text: "The report has been successfully generated!",
    });
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
            <span></span>
          </div>
          <div className="float-right mr-10 mt-10">
            <a href="/AddStock">
              <CgAddR className="text-green-600 text-3xl cursor-copy" />
            </a>
          </div>
          <div className="float-right mr-10 mt-10">
            <RiAiGenerate
              className="text-green-600 text-3xl cursor-pointer"
              onClick={generateReport}
            />
          </div>
          <br />
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-4 py-2 w-96  focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {searchResults.length === 0 && (
            <p className="text-center text-red-500">No matching data found.</p>
          )}
          <br />
          <hr />
          <div className="grid grid-cols-3 gap-10 p-8 ">
            <div className="grid grid-col-1 bg-green-500 p-5 rounded-2xl">
              <div className="grid grid-cols-2 ">
                <TiShoppingCart className="text-white text-4xl" />
                <span className="text-xl font-medium">Total Fruit Item</span>
                <p></p>
                <p className="text-6xl  font-bold text-white inline-block align-middle">{rowCount}</p>
              </div>
            </div>
            <div className=" grid grid-col-2 bg-yellow-500 p-5 rounded-2xl">
              <div className="grid grid-cols-2">
                <BsGraphDownArrow className="text-white text-4xl" />
                <span className="text-xl font-medium">Number of Items less than 100kg</span>
                <p> </p>
                <p className="text-6xl  font-bold text-white inline-block align-middle">{itemsBelow100}</p>
              </div>
            </div>
            <div className="grid grid-col-3 bg-red-600 p-5 rounded-2xl">
              <div className="grid grid-cols-2">
                <BsCartX className="text-white text-4xl" />
                <span className="text-xl text-slate-300 font-medium">Out of Stock</span>
                <p> </p>
                <p className="text-6xl font-bold text-slate-300 inline-block align-middle">{outOfStockItemCount}</p>
              </div>
            </div>
          </div>
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
                    <td className="h-12 border-b-2 p-2">{item.FruitID}</td>
                    <td className="border-b-2">{item.FruitName}</td>
                    <td className="border-b-2">{item.FruitQuantity}kg</td>
                    <td className="border-b-2">Rs.{item.price}.00</td>
                    <td className="border-b-2">
                      <img
                        src={item.image}
                        alt={item.FruitName}
                        className="w-16 h-16 object-cover flex items-center justify-center rounded-2xl p-1"
                      />
                    </td>
                    <td className="border-b-2 w-16">
                      
                    </td>
                    <td className="border-b-2 w-16">
                      <a href="/UpdateStock">
                        <FaPenToSquare className="text-green-600 text-2xl" />
                      </a>
                    </td>
                    <td className="border-b-2 w-16">
                    <button onClick={() => handleConfirmClick(item._id)}>
                        <MdDeleteForever className="text-red-600 text-3xl" />
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
