import React, { useState } from "react";
import OfferImageAdd from "../components/OfferImageAdd";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CreateOffer = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [variant, setVariant] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImageUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertMessageNumber, setAlertMessageNumber] = useState("");
  const [alertMessageQuantity, setAlertMessageQuantity] = useState("");
  const [alertMessageID, setalertMessageID] = useState("");

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  //validation part
  const isValidName = (input) => {
    return /^[A-Za-z\s]+$/.test(input);
  };

  const isValidPositiveNumber = (input) => {
    return /^[1-9]\d*$/.test(input);
  };

  const isValidPositiveDecimalNumber = (input) => {
    return /^\d*\.?\d*$/.test(input) && parseFloat(input) > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidName(name)) {
      setAlertMessage("Name should contain only letters.");
      return;
    }
    if (!isValidPositiveDecimalNumber(price)) {
      setAlertMessageNumber("Price should be a positive number.");
      return;
    }
    if (!isValidPositiveNumber(quantity)) {
      setAlertMessageQuantity("Quantity should be a positive integer.");
      return;
    }
    const offerData = {
      name,
      price,
      variant,
      quantity,
      description,
      image,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Offer/create",
        offerData
      );
      if (response.data.success) {
        console.log("Data successfully added to MongoDB!");
        setName("");
        setPrice("");
        setVariant("");
        setQuantity("");
        setDescription("");
        setImageUrl("");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Create Offer successfully!",
        });
      } else {
        console.error("Error adding data to MongoDB:", response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Offer ID already exists"
      ) {
        setalertMessageID("Offer ID already exists.");
      } else {
        console.error("Error adding data to MongoDB:", error);
      }
    }
  };

  const handleCancelClick = () => {
    Swal.fire({
      icon: "question",
      title: "Cancel",
      text: "Are you sure you want to cancel?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setName("");
        setPrice("");
        setVariant("");
        setQuantity("");
        setDescription("");
        setImageUrl("");
        setAlertMessage("");
      }
    });
  };

  return (
    <div className="min-h-screen bg-yellow-100">
    <div className="p-16 ">
    <div className="p-12 mr-32 ml-32 bg-green-200 shadow-md rounded-md">
      <div className="flex gap-2">
        <Link to="/AdminOffer">
          <IoArrowBackCircleOutline className="text-4xl" />
        </Link>
        <h2 className="text-2xl font-semibold mb-4">Add Offer</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="mb-5">
            <div className="mb-4">
              <label
                htmlFor="offerID"
                className="block text-gray-700 font-bold mb-2"
              >
                Offer ID
              </label>
              <input
                type="text"
                id="offerID"
                name="offerID"
                value={offerID}
                onChange={(e) => {
                  setOfferID(e.target.value);
                  setAlertMessage("");
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {alertMessageID && (<p className="text-red-500 mt-1">{alertMessageID}</p>)}
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  const inputName = e.target.value;
                  if (/^[A-Za-z\s]+$/.test(inputName) || inputName === "") {
                    setName(inputName);
                    setAlertMessage("");
                  } else {
                    setAlertMessage("Name should contain only letters.");
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {alertMessage && (
                <p className="text-red-500 mt-1">{alertMessage}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border h-32 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {alertMessageNumber && (
                <p className="text-red-500 mt-1">{alertMessageNumber}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-gray-700 font-bold mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {alertMessageQuantity && (
                <p className="text-red-500 mt-1">{alertMessageQuantity}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="variant"
                className="block text-gray-700 font-bold mb-2"
              >
                Variant
              </label>
              <select
                id="variant"
                name="variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              >
                <option value=""></option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <OfferImageAdd onImageUrlChange={handleImageUrlChange} />
        </div>
        <div className="flex gap-5 justify-end">
          <button
            type="submit"
            className="w-72 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
          >
            Submit
          </button>
          <button
            type="button"
            className=" w-72 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
        </div>
      </form>
    </div>
    </div>
    </div>
    
  );
};

export default CreateOffer;
