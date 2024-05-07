import React, { useState } from "react";
import UploadImage from "../components/UploadImage";
import axios from 'axios';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const AddStock = () => {
  const [fruitName, setFruitName] = useState("");
  const [fruitQuantity, setFruitQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImageUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  //get image URL from Uplaod image component and set URL
  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  //Handel create stock fruit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockData = {
      FruitName: fruitName,
      FruitQuantity: fruitQuantity,
      price: price,
      category: category,
      image: image,
    };
    try {
      const response = await axios.post('http://localhost:3000/api/stock/createstock', stockData);
      if (response.data.success) {
        console.log("Data successfully added to MongoDB!");
        setFruitName("");
        setFruitQuantity("");
        setPrice("");
        setCategory("");
        setImageUrl("");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data successfully added to MongoDB!",
        });
      } else {
        console.error('Error adding data to MongoDB:', response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'FruitID already exists') {
        setAlertMessage('Fruit ID already exists. Please enter a different Fruit ID.');
      } else {
        console.error("Error adding data to MongoDB:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "All fields are required.",
        });
      }
    }
  };
  
  //Clear form
  const clearForm = () => {
    setFruitName("");
    setFruitQuantity("");
    setPrice("");
    setCategory("");
    setImageUrl("");
    Swal.fire({
      icon: "success",
      title: "Cleared",
      text: "Form cleared successfully!",
    });
  };

  const clearImage = () => {
    setImageUrl("");
  };

  //Form Validation
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "fruitName") {
      if (/^[A-Za-z\s]+$/.test(value) || value === "") {
        setFruitName(value);
        setAlertMessage("");
      } else {
        setAlertMessage("**Enter only letters and spaces**");
      }
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };
  

  return (
    <div className="min-h-screen grid bg-yellow-100">
      <div></div>
      <div>
        <div className="max-w-md mx-auto p-6 bg-green-200 shadow-md rounded-md">
          <div className="flex gap-2">
            <Link to="/AdminStock">
              <IoArrowBackCircleOutline className="text-4xl" />
            </Link>
            <h2 className="text-2xl font-semibold mb-4"> Add </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex gap-3">
                <label
                  htmlFor="fruitName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Fruit Name
                </label>
                {alertMessage && (
                  <p className="block text-red-500">{alertMessage}</p>
                )}
              </div>
              <input
                type="text"
                id="fruitName"
                name="fruitName"
                value={fruitName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fruitQuantity"
                className="block text-gray-700 font-bold mb-2"
              >
                Fruit Quantity (kg)
              </label>
              <input
                type="number"
                id="fruitQuantity"
                name="fruitQuantity"
                value={fruitQuantity}
                onChange={(e) => setFruitQuantity(e.target.value)}
                min="0"
                max="100000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price (Per 100g)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="50"
                max="10000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="variant"
                className="block text-gray-700 font-bold mb-2"
              >
                Variant
              </label>
              <div className=" gap-9 flex items-center justify-start ">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="small"
                    name="variant"
                    value="Imported"
                    checked={category === "Imported"}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-radio h-5 w-5 text-orange-500"
                  />
                  <span className="ml-2">Imported</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    id="medium"
                    name="variant"
                    value="Local"
                    checked={category === "Local"}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-radio h-5 w-5 text-orange-500"
                  />
                  <span className="ml-2">Local</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <UploadImage
                onImageUrlChange={handleImageUrlChange}
                clearImage={clearImage}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
              onClick={() => {
                Swal.fire({
                  icon: "info",
                  title: "Submitting...",
                  text: "Please wait...",
                  showConfirmButton: false,
                });
              }}
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-2 w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              onClick={() => {
                clearForm();
              }}
            >
              Clear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStock;
