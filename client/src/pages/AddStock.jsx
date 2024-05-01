import React, { useState } from "react";
import UploadImage from "../components/UploadImage";
import axios from 'axios';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const AddStock = () => {
  const [fruitId, setFruitId] = useState("");
  const [fruitName, setFruitName] = useState("");
  const [fruitQuantity, setFruitQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImageUrl] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockData = {FruitName: fruitName, FruitQuantity: fruitQuantity, price: price, image: image };
    try {
      const response = await axios.post('http://localhost:3000/api/stock/createstock', stockData);
      if (response.data.success) {
        console.log('Data successfully added to MongoDB!');
        setFruitName('');
        setFruitQuantity('');
        setPrice('');
        setImageUrl('');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data successfully added to MongoDB!',
        });
      } else {
        console.error('Error adding data to MongoDB:', response.data.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'FruitID already exists') {
        setAlertMessage('Fruit ID already exists. Please enter a different Fruit ID.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Fruit ID already exists. Please enter a different Fruit ID.',
        });
      } else {
        console.error('Error adding data to MongoDB:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error adding data to MongoDB!',
        });
      }
    }
  };

  const clearForm = () => {
    setFruitName('');
    setFruitQuantity('');
    setPrice('');
    setImageUrl('');
    Swal.fire({
      icon: 'success',
      title: 'Cleared',
      text: 'Form cleared successfully!',
    });
  };

  const clearImage = () => {
    setImageUrl('');
  };
  
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "fruitName") {
      if (/^[A-Za-z\s]+$/.test(value) || value === "") {
        setFruitName(value);
      }
    } else {
      setFormData({
        ...formData,
        [id]: value
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-200 shadow-md rounded-md">
      <div className="flex gap-2">
        <Link to="/AdminStock">
          <IoArrowBackCircleOutline className="text-4xl" />
        </Link>
        <h2 className="text-2xl font-semibold mb-4"> Add </h2>
      </div>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="fruitName" className="block text-gray-700 font-bold mb-2">
            Fruit Name
          </label>
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
          <label htmlFor="fruitQuantity" className="block text-gray-700 font-bold mb-2">
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
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
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
          <UploadImage onImageUrlChange={handleImageUrlChange} clearImage={clearImage} />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
          onClick={() => {
            Swal.fire({
              icon: 'info',
              title: 'Submitting...',
              text: 'Please wait...',
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
  );
};

export default AddStock;

