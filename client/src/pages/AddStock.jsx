import React from "react";
import UploadImage from "../components/UploadImage";

const AddStock = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-100 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Stock  Information</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="fruitId"
            className="block text-gray-700 font-bold mb-2"
          >
            Fruit ID
          </label>
          <input
            type="text"
            id="fruitId"
            name="fruitId"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fruitName"
            className="block text-gray-700 font-bold mb-2"
          >
            Fruit Name
          </label>
          <input
            type="text"
            id="fruitName"
            name="fruitName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fruitQuantity"
            className="block text-gray-700 font-bold mb-2"
          >
            Fruit Quantity(kg)
          </label>
          <input
            type="number"
            id="fruitQuantity"
            name="fruitQuantity"
            min="100"
            max="100000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price(Per 100g)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="50"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </div>
      </form>
      <div className="mb-4">
      <UploadImage/>
      </div>
      <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Submit
        </button>
      
    </div>
  );
};

export default AddStock;
