import React, { useState, useEffect } from "react";
import axios from 'axios';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

const UpdateStock = () => {
  const { id } = useParams(); 
  const [fruitName, setFruitName] = useState("");
  const [fruitQuantity, setFruitQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/Stock/${id}`);
        const { FruitName, FruitQuantity, price, image } = response.data;
        setFruitName(FruitName);
        setFruitQuantity(FruitQuantity);
        setPrice(price);
        setImageUrl(image);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleImageUrlChange = (url) => {
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockData = { fruitName, fruitQuantity, price, image };
    try {
      const response = await axios.put(`http://localhost:3000/api/Stock/Update/${id}`, stockData);
      if (response.data.success) {
        console.log('Data successfully updated in MongoDB!');
      } else {
        console.error('Error updating data in MongoDB:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating data in MongoDB:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-200 shadow-md rounded-md">
      <div className="flex gap-2">
        <Link to="/AdminStock">
          <IoArrowBackCircleOutline className="text-4xl" />
        </Link>
        <h2 className="text-2xl font-semibold mb-4">Update Stock Information</h2>
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
            onChange={(e) => setFruitName(e.target.value)}
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
            min="100"
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
        <UploadImage onImageUrlChange={handleImageUrlChange} />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-indigo-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateStock;
