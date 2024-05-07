import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateStock() {
  const { _id } = useParams();
  const [stockItem, setStockItem] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    FruitName: "",
    FruitQuantity: "",
    price: "",
    category: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get stock Fruit by id
  useEffect(() => {
    const fetchStockItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Stock/${_id}`
        );
        setStockItem(response.data.data);
      } catch (error) {
        console.error("Error fetching stock item:", error);
      }
    };

    fetchStockItem();
  }, [_id]);

  //Form validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "FruitName") {
      if (/^[A-Za-z\s]+$/.test(value) || value === "") {
        setErrorMessage("");
      } else {
        setErrorMessage("**Enter only letters and spaces**");
        return;
      }
    }

    setUpdatedDetails({
      ...updatedDetails,
      [name]: value,
    });
  };

  const handleImageUrlChange = (imageUrl) => {
    setUpdatedDetails({
      ...updatedDetails,
      image: imageUrl,
    });
  };

  //Handel Update button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/Stock/update/${_id}`,
        updatedDetails
      );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Fruit Details updated successfully!",
      });
    } catch (error) {
      console.error("Error updating stock item:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error updating stock item. Please try again.",
      });
    }
  };

  
  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedDetails({
      FruitID: stockItem.FruitID,
      FruitName: stockItem.FruitName,
      FruitQuantity: stockItem.FruitQuantity,
      price: stockItem.price,
      category: stockItem.category,
      image: stockItem.image,
    });
  };

  const clearImage = () => {
    setUpdatedDetails({
      ...updatedDetails,
      image: "",
    });
  };

  if (!stockItem) {
    return <div>Loading...</div>;
  }

  const { FruitID, FruitName, FruitQuantity, price, category, image } =
    stockItem;

  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="bg-red-100 p-20 place-content-center">
        <div className="">
          <div className="flex gap-1">
            <Link to="/AdminStock">
              <IoArrowBackCircleOutline className="text-4xl" />
            </Link>
            <h2 className="text-2xl font-semibold mb-4">Fruit Details</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <img
                src={image}
                alt={FruitName}
                className="w-72 rounded-xl shadow-md"
              />
            </div>
            <div className="place-content-center">
              <div className="mb-8">
                <table>
                  <tbody>
                    <tr className="h-9">
                      <td className="text-gray-800 text-xl mb-1 font-medium w-48">
                        Fruit ID
                      </td>
                      <td className="text-gray-800 text-xl mb-1 w-48">
                        : {FruitID}
                      </td>
                    </tr>
                    <tr className="h-9">
                      <td className="text-gray-800 text-xl mb-1 font-medium">
                        Fruit Name
                      </td>
                      <td className="text-gray-800 text-xl mb-1 ">
                        : {FruitName}
                      </td>
                    </tr>
                    <tr className="h-9">
                      <td className="text-gray-800 text-xl mb-1 font-medium">
                        Fruit Quantity
                      </td>
                      <td className="text-gray-800 text-xl mb-1">
                        : {FruitQuantity}kg
                      </td>
                    </tr>
                    <tr className="h-9">
                      <td className="text-gray-800 text-xl mb-1 font-medium">
                        Price[per 100g]
                      </td>
                      <td className="text-gray-800 text-xl mb-1">
                        : Rs {price}.00
                      </td>
                    </tr>
                    <tr className="h-9">
                      <td className="text-gray-800 text-xl mb-2 font-medium">
                        Category
                      </td>
                      <td className="text-gray-800 text-xl mb-2">
                        : {category}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEditClick}
                  className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-100">
        {isEditing && (
          <div className="max-w-md mx-auto mt-10 p-6 bg-green-200 shadow-md rounded-md">
            <div className="flex gap-2">
              <h2 className="text-2xl font-semibold mb-4">Update</h2>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Fruit ID:
                  </label>
                  <input
                    type="text"
                    name="FruitID"
                    readOnly
                    value={updatedDetails.FruitID}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 cursor-not-allowed	"
                  />
                </div>
                <div className="mb-4">
                  <div className="flex gap-2 ">
                    <label className="block text-gray-700 font-bold mb-2">
                      Fruit Name:
                    </label>
                    {errorMessage && (
                      <p className="text-red-500  block ">{errorMessage}</p>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    name="FruitName"
                    value={updatedDetails.FruitName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Fruit Quantity:
                  </label>
                  <input
                    type="number"
                    required
                    name="FruitQuantity"
                    value={updatedDetails.FruitQuantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Price:
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={updatedDetails.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Category:
                  </label>
                  <div className="flex gap-5">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="Imported"
                        checked={updatedDetails.category === "Imported"}
                        onChange={handleChange}
                        className="mr-2"
                        required
                      />
                      Imported
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="Local"
                        checked={updatedDetails.category === "Local"}
                        onChange={handleChange}
                        className="mr-2"
                        required
                      />
                      Local
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
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}