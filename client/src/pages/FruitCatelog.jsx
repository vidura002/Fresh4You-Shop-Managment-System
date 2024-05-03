import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FruitCatelog() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [availableCount, setAvailableCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [sortOption, setSortOption] = useState("priceLowToHigh");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/Stock/getAll"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    let filtered = data.filter((item) =>
      item.FruitName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "alphabeticallyAZ") {
      filtered.sort((a, b) => a.FruitName.localeCompare(b.FruitName));
    } else if (sortOption === "alphabeticallyZA") {
      filtered.sort((a, b) => b.FruitName.localeCompare(a.FruitName));
    }

    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    filtered = filtered.filter((item) => {
      if (showAvailableOnly && showOutOfStock) {
        return item.FruitQuantity > 0 || item.FruitQuantity === 0;
      } else if (showAvailableOnly) {
        return item.FruitQuantity > 0;
      } else if (showOutOfStock) {
        return item.FruitQuantity === 0;
      } else {
        return true;
      }
    });

    //count the out of stock and available fruits
    const availableCount = filtered.filter(
      (item) => item.FruitQuantity > 0
    ).length;
    const outOfStockCount = filtered.filter(
      (item) => item.FruitQuantity === 0
    ).length;
    setAvailableCount(availableCount);
    setOutOfStockCount(outOfStockCount);

    setFilteredData(filtered);
  }, [
    data,
    searchTerm,
    sortOption,
    priceRange,
    showAvailableOnly,
    showOutOfStock,
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (value) => {
    setSearchTerm(value);
  };

  const handleCheckboxChange = (e) => {
    const checkboxName = e.target.name;
    const isChecked = e.target.checked;

    if (checkboxName === "sortByPrice") {
      setSortByPrice(isChecked);
    } else if (checkboxName === "showAvailableOnly") {
      setShowAvailableOnly(isChecked);
    } else if (checkboxName === "showOutOfStock") {
      setShowOutOfStock(isChecked);
    }
  };

  const handlePriceRangeChange = (e) => {
    const newPriceRange = [...priceRange];
    newPriceRange[e.target.dataset.index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  const handleSortChange = (option) => {
    setSortOption(sortOption === option ? "" : option);
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center text-2xl">
        <Link
          to={"/FruitCatelog"}
          className={
            location.pathname === "/FruitCatelog"
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
      <div className="bg-gray-200 p-4 grid grid-cols-3 place-content-center">
        <div></div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2 w-96 focus:outline-none focus:border-blue-500 "
            value={searchTerm}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </div>
      </div>
      <div className=" grid grid-cols-5 m-5">
        <div className="col-span-1">
          <div className="bg-gray-200 p-4 rounded-md">
            <div className="mb-5">
              <span className="text-2xl font-semibold">Filters</span>
            </div>

            <div>
              <div className="bg-gray-200 rounded-md mb-5">
                <span className="text-lg font-semibold">Sort by:</span>
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="priceLowToHigh"
                    name="priceLowToHigh"
                    checked={sortOption === "priceLowToHigh"}
                    onChange={() => handleSortChange("priceLowToHigh")}
                    className="form-checkbox h-5 w-5 accent-green-500 mr-2"
                  />
                  <label htmlFor="priceLowToHigh" className="text-lg font-font1 font-medium text-black">
                    Price low to high
                  </label>
                </div>
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="priceHighToLow"
                    name="priceHighToLow"
                    checked={sortOption === "priceHighToLow"}
                    onChange={() => handleSortChange("priceHighToLow")}
                    className="form-checkbox h-5 w-5 accent-green-500 mr-2"
                  />
                  <label htmlFor="priceHighToLow" className="text-lg font-font1 font-medium text-black">
                    Price high to low
                  </label>
                </div>
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="alphabeticallyAZ"
                    name="alphabeticallyAZ"
                    checked={sortOption === "alphabeticallyAZ"}
                    onChange={() => handleSortChange("alphabeticallyAZ")}
                    className="form-checkbox h-5 w-5 accent-green-500 mr-2"
                  />
                  <label htmlFor="alphabeticallyAZ" className="text-lg font-font1 font-medium text-black">
                    Alphabetically A-Z
                  </label>
                </div>
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="alphabeticallyZA"
                    name="alphabeticallyZA"
                    checked={sortOption === "alphabeticallyZA"}
                    onChange={() => handleSortChange("alphabeticallyZA")}
                    className="form-checkbox h-5 w-5 accent-green-500 mr-2"
                  />
                  <label htmlFor="alphabeticallyZA" className="text-lg font-font1 font-medium text-black">
                    Alphabetically Z-A
                  </label>
                </div>
              </div>
            </div>
            <hr />
            <div className="mb-2">
              <span className="text-lg font-semibold">Price:</span>
            </div>
            <div className="flex">
              <input
                type="range"
                min="0"
                max="3000"
                value={priceRange[0]}
                onChange={handlePriceRangeChange}
                data-index={0}
                className="w-32 accent-green-400"
              />
              <span className="ml-2 text-lg font-font1 font-medium text-black">Rs. {priceRange[0]}.00</span>
            </div>
            <div className="flex mb-5">
              <input
                type="range"
                min="0"
                max="3000"
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
                data-index={1}
                className="w-32 accent-green-400"
              />
              <span className="ml-2 text-lg font-font1 font-medium text-black">Rs. {priceRange[1]}.00</span>
            </div>
            <div className="mb-5">
              <span className="text-lg font-semibold">Availability</span>
            </div>
            <div className="mb-5">
              <label htmlFor="showAvailableOnly" className="flex items-center">
                <input
                  type="checkbox"
                  id="showAvailableOnly"
                  name="showAvailableOnly"
                  checked={showAvailableOnly}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 accent-green-500"
                />
                <span className="ml-2 text-lg font-font1 font-medium text-black">
                  Show available only ({availableCount})
                </span>
              </label>
            </div>
            <div className="mb-5">
              <label htmlFor="showOutOfStock" className="flex items-center">
                <input
                  type="checkbox"
                  id="showOutOfStock"
                  name="showOutOfStock"
                  checked={showOutOfStock}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 accent-green-500"
                />
                <span className="ml-2 text-lg font-font1 font-medium text-black">
                  Show out of stock only ({outOfStockCount})
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <ul className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 ml-10 mr-10">
            {filteredData.map((item, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded-md overflow-hidden animate-fade-in shadow-xl"
              >
                <div className="flex items-center justify-center">
                  <img src={item.image} alt={item.FruitName} />
                </div>
                <div className="p-4">                
                  <h2 className="text-lg font-semibold">{item.FruitName} - <span className="text-lg font-semibold ">{item.category}</span></h2>
                  <p className="text-red-600 text-2xl">
                    Rs.{item.price}.00{" "}
                    <span className="text-black text-lg">[Per 100g]</span>
                  </p>
                  <br />
                  <button
                    className={`w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-00 animate-fade-in ${
                      item.FruitQuantity === 0
                        ? "bg-red-500 cursor-not-allowed hover:bg-red-500 "
                        : ""
                    }`}
                    disabled={item.FruitQuantity === 0}
                    onClick={() => handleAddToCart(item.itemId, 0.1)} 
                  >
                    {item.FruitQuantity === 0 ? "Sold Out" : "Add to Cart"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default FruitCatelog;
