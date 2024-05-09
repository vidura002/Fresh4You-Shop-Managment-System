import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoMdNotificationsOutline } from "react-icons/io";


function OfferCatalog() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/offer/GetAllOffers"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchData();
  }, []);

  //filter shorted operation
  useEffect(() => {
    let filtered = data.filter((offer) =>
      offer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "alphabeticallyAZ") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "alphabeticallyZA") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    filtered = filtered.filter(
      (offer) => offer.price >= priceRange[0] && offer.price <= priceRange[1]
    );

    if (showAvailableOnly) {
      filtered = filtered.filter((offer) => offer.quantity > 0);
    }

    if (showOutOfStock) {
      filtered = filtered.filter((offer) => offer.quantity === 0);
    }

    setFilteredData(filtered);
  }, [
    data,
    searchTerm,
    priceRange,
    showAvailableOnly,
    showOutOfStock,
    sortOption,
  ]);

  const handleFilter = (value) => {
    setSearchTerm(value);
  };

  const handleViewMore = (offer) => {
    setSelectedOffer(offer);
  };

  const handleCloseDetails = () => {
    setSelectedOffer(null);
  };

  //check availablity
  const handleCheckboxChange = (e) => {
    const checkboxName = e.target.name;
    const isChecked = e.target.checked;

    if (checkboxName === "showAvailableOnly") {
      setShowAvailableOnly(isChecked);
    } else if (checkboxName === "showOutOfStock") {
      setShowOutOfStock(isChecked);
    }
  };

  //price range handel
  const handlePriceRangeChange = (e) => {
    const index = parseInt(e.target.dataset.index);
    const value = parseInt(e.target.value);
    setPriceRange((prevRange) => {
      const newRange = [...prevRange];
      newRange[index] = value;
      return newRange;
    });
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
      {/* Search Bar */}
      <div className="bg-gray-200 p-4 grid grid-cols-3 mb-5 place-content-center">
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
      <div className="grid grid-cols-5 m-5 ">
        <div>
          <div className="col-span-1">
            <div className="bg-gray-200 p-4 rounded-md">
              {/* Checkboxes - Sorted operations */}
              <div className="mb-5">
                <span className="text-2xl font-semibold">Filters</span>
              </div>
              <div className="bg-gray-200 rounded-md mb-5">
                <div>
                  <div className="bg-gray-200 rounded-md mb-5">
                    <span className="text-lg font-semibold">Sort by:</span>
                    {/* Checkboxe - Price low to high */}
                    <div className="flex items-center mt-3">
                      <input
                        type="checkbox"
                        id="priceLowToHigh"
                        name="priceLowToHigh"
                        checked={sortOption === "priceLowToHigh"}
                        onChange={() => handleSortChange("priceLowToHigh")}
                        className="form-checkbox h-5 w-5 accent-green-500 mr-2"
                      />
                      <label
                        htmlFor="priceLowToHigh"
                        className="text-lg font-font2 font-medium text-black "
                      >
                        Price low to high
                      </label>
                    </div>
                    {/* Checkboxe - Price high to low */}
                    <div className="flex items-center mt-3">
                      <input
                        type="checkbox"
                        id="priceHighToLow"
                        name="priceHighToLow"
                        checked={sortOption === "priceHighToLow"}
                        onChange={() => handleSortChange("priceHighToLow")}
                        className="form-checkbox h-5 w-5 accent-green-500 mr-2"
                      />
                      <label
                        htmlFor="priceHighToLow"
                        className="text-lg font-font2 font-medium text-black"
                      >
                        Price high to low
                      </label>
                    </div>
                    {/* Checkboxe - SAlphabetically A-Z */}
                    <div className="flex items-center mt-3">
                      <input
                        type="checkbox"
                        id="alphabeticallyAZ"
                        name="alphabeticallyAZ"
                        checked={sortOption === "alphabeticallyAZ"}
                        onChange={() => handleSortChange("alphabeticallyAZ")}
                        className="form-checkbox h-5 w-5 accent-green-500 mr-2"
                      />
                      <label
                        htmlFor="alphabeticallyAZ"
                        className="text-lg font-font2 font-medium text-black"
                      >
                        Alphabetically A-Z
                      </label>
                    </div>
                    {/* Checkboxe - Alphabetically Z-A */}
                    <div className="flex items-center mt-3">
                      <input
                        type="checkbox"
                        id="alphabeticallyZA"
                        name="alphabeticallyZA"
                        checked={sortOption === "alphabeticallyZA"}
                        onChange={() => handleSortChange("alphabeticallyZA")}
                        className="form-checkbox h-5 w-5 accent-green-500 mr-2"
                      />
                      <label
                        htmlFor="alphabeticallyZA"
                        className="text-lg font-font2 font-medium text-black"
                      >
                        Alphabetically Z-A
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Range Bar -  Price Range */}
              <div className="mb-2">
                <span className="text-lg font-semibold">Price:</span>
              </div>
              {priceRange.map((range, index) => (
                <div key={index} className="flex">
                  <input
                    type="range"
                    min="0"
                    max="30000"
                    value={range}
                    onChange={handlePriceRangeChange}
                    data-index={index}
                    className="w-32 accent-green-400"
                  />
                  <span className="ml-2 text-lg font-font2 font-medium text-black">
                    Rs. {range}.00
                  </span>
                </div>
              ))}

              {/* Checkboxes - Availability */}
              <div className="mb-5 mt-5">
                <span className="text-lg font-semibold">Availability</span>
              </div>
              {[
                {
                  name: "showAvailableOnly",
                  text: "Show available only",
                  count: filteredData.filter((item) => item.quantity > 0)
                    .length,
                },
                {
                  name: "showOutOfStock",
                  text: "Show out of stock only",
                  count: filteredData.filter((item) => item.quantity === 0)
                    .length,
                },
              ].map(({ name, text, count }) => (
                <div key={name} className="mb-5">
                  <label htmlFor={name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={name}
                      name={name}
                      checked={
                        name === "showAvailableOnly"
                          ? showAvailableOnly
                          : showOutOfStock
                      }
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-5 w-5 accent-green-500"
                    />
                    <span className="ml-2 text-lg font-font2 font-medium text-black">
                      {text} ({count})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid col-span-4">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 ml-10 mr-10">
            {filteredData.map((item, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded-md overflow-hidden animate-fade-in shadow-xl"
              >
                <div className="flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="" />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">
                    {item.name}{" "}
                    <span className="text-xl text-green-900">
                      [{item.variant}]
                    </span>
                  </h2>
                  <p className="text-red-600 text-2xl">
                    Rs.{item.price}.00{" "}
                    <span className="text-black text-lg">[Per 1 item]</span>
                  </p>
                  <br />
                  <button className="w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-600 animate-fade-in mb-3">
                    Add to Cart
                  </button>
                  <button
                    className={`w-full bg-gray-300 text-black  font-medium py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-100 animate-fade-in ${
                      item.quantity === 0
                        ? "bg-red-500 cursor-not-allowed hover:bg-red-500"
                        : ""
                    }`}
                    disabled={item.quantity === 0}
                    onClick={() => handleViewMore(item)}
                  >
                    {item.quantity === 0 ? "Sold Out" : "View More"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/*View more*/}
      {selectedOffer && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center mb-5">
          <div className="bg-white p-8 rounded-md shadow-lg w-1/3 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none"
              onClick={handleCloseDetails}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-950">
              {selectedOffer.name}{" "}
              <span className="text-2xl text-green-900">
                [{selectedOffer.variant}]
              </span>
            </h2>
            <div className="flex items-center justify-center">
              <img
                src={selectedOffer.image}
                alt={selectedOffer.name}
                className="w-96"
              />
            </div>
            <p className="text-gray-700 mb-4">{selectedOffer.description}</p>
            <p className="text-red-600 text-xl">
              Rs.{selectedOffer.price}.00{" "}
              <span className="text-black text-base">[Per 1 item]</span>
            </p>
            <button className="bg-green-800 text-white py-2 px-4 w-32 rounded-md hover:bg-green-700 focus:outline-none float-end  focus:bg-green-600">
              Add to Cart
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default OfferCatalog;
