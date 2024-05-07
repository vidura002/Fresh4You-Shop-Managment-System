import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { setDataProduct, addCartItem } from "../redux/productSlice";
import { useDispatch } from "react-redux";
import Header from "../components/Header";

function FruitCatalog() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  //get all offers
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/Stock/getAll"
      );
      console.log("API :", response.data);
      dispatch(setDataProduct(response.data.data));
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error :", error);
      setLoading(false);
    }
  };

  // Filter data based on search term
  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.FruitName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Initial data fetching
  useEffect(() => {
    fetchData();
  }, []);

  // Handle search term change
  const handleFilter = (value) => {
    setSearchTerm(value);
  };
  const handleAddToCart = (data) => {
    dispatch(addCartItem(data));
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center text-2xl">
        <Link
          to={"/FruitCatalog"}
          className={
            location.pathname === "/FruitCatalog"
              ? "text-black font-bold mt-5 hover:text-slate-500"
              : "text-gray-500 mt-5 hover:text-slate-500"
          }
        >
          <h1>Fruits</h1>
        </Link>
        <h1 className="mt-5 mx-3">|</h1>
        <Link
          to={"/OfferCatalog"}
          className={
            location.pathname === "/OfferCatalog"
              ? "text-black mt-5 font-bold hover:text-slate-500"
              : "text-gray-500 mt-5 hover:text-slate-500"
          }
        >
          <h1>Offers</h1>
        </Link>
      </div>
      <br />
      <hr />

      <div className="bg-gray-200 p-4 grid grid-cols-3">
        <div></div>
        <div>
          <h2 className="text-lg font-semibold mb-4 ">Filters</h2>
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            onChange={(e) => handleFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 mb-4 block w-96"
          />
        </div>
        <div></div>
      </div>
      <br />

      <Suspense
        fallback={<div className="text-center text-6xl">Loading...</div>}
      >
        <ul className="grid gap-5 md:grid-cols-3 lg:grid-cols-5 ml-10 mr-10">
          {loading ? (
            <div className="text-center my-4">Loading...</div>
          ) : (
            filteredData.map((item, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded-md overflow-hidden animate-fade-in shadow-xl"
              >
                <div className="flex items-center justify-center">
                  <img src={item.image} alt={item.FruitName} className="" />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.FruitName}</h2>
                  <p className="text-red-600 text-2xl">
                    Rs.{item.price}.00{" "}
                    <span className="text-black text-lg">[Per 100g]</span>
                  </p>
                  <br />
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-indigo-600 animate-fade-in ${
                      item.FruitQuantity === 0
                        ? "bg-red-500 cursor-not-allowed hover:bg-red-500 "
                        : ""
                    }`}
                    disabled={item.FruitQuantity === 0}
                  >
                    {item.FruitQuantity === 0 ? "Sold Out" : "Add to Cart"}
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </Suspense>

      <br />
      <Footer />
    </div>
  );
}

export default FruitCatalog;
