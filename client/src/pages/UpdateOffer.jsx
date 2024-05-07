import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import Swal from "sweetalert2";
import OfferImageAdd from "../components/OfferImageAdd";

export default function UpdateOffer() {
  const { _id } = useParams();
  const [offer, setOffer] = useState(null);
  const [updatedOffer, setUpdatedOffer] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/offer/${_id}`);
        setOffer(response.data.data);
        setUpdatedOffer(response.data.data);
      } catch (error) {
        console.error("Error fetching offer:", error);
      }
    };

    fetchOffer();
  }, [_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOffer({ ...updatedOffer, [name]: value });
  };

  const handleImageUrlChange = (url) => {
    setUpdatedOffer({ ...updatedOffer, image: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, quantity } = updatedOffer;

    // Validate name
    if (!isValidName(name)) {
      setAlertMessage("Name should contain only letters.");
      return;
    }

    // Other validation for price and quantity can be added here...

    try {
      const response = await axios.put(`http://localhost:3000/api/offer/Update/${_id}`, updatedOffer);
      console.log("Offer updated successfully:", response.data);
      Swal.fire({
        icon: "success",
        title: "Offer Updated",
        text: "The offer has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating offer:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the offer. Please try again later.",
      });
    }
  };

  if (!offer) {
    return <div>Loading...</div>;
  }

  const { name, image, variant } = offer;

  const isValidName = (input) => {
    return /^[A-Za-z\s]+$/.test(input);
  };

  return (
    <div className="min-h-screen bg-yellow-100">
      <div className="">
      <div className="flex content-center justify-center ">
        <img src={image} alt={name} style={{ maxWidth: "150px" }} className="rounded-full shadow-xl absolute ring-offset-10 ring-8 ring-green-200 mt-6" />
      </div>
      <div className="ml-32 mr-32 p-6 bg-green-200 shadow-md rounded-md mt-20">
        <div className="flex gap-2">
          <Link to="/AdminOffer">
            <IoArrowBackCircleOutline className="text-4xl" />
          </Link>
          <h2 className="text-2xl font-semibold mb-4">Update Offer</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="mb-3 ">
                <label className="block text-gray-700 font-bold mb-2">Offer ID:</label>
                <input type="text" name="offerID" readOnly value={updatedOffer.offerID} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 cursor-not-allowed" />
              </div>
              <div className="mb-3 ">
                <div className="flex gap-5">
                  <label className="block text-gray-700 font-bold mb-2">Offer Name:</label>
                  {alertMessage && <p className="text-red-500 mt-1">{alertMessage}</p>}
                </div>
                <input type="text" name="name" value={updatedOffer.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="mb-3 ">
                <label className="block text-gray-700 font-bold mb-2">Description of Offer:</label>
                <textarea name="description" value={updatedOffer.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div>
              <div className="mb-3 ">
                <label className="block text-gray-700 font-bold mb-2">Price:</label>
                <input type="number" name="price" value={updatedOffer.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="mb-3 ">
                <label className="block text-gray-700 font-bold mb-2">Quantity:</label>
                <input type="number" name="quantity" value={updatedOffer.quantity} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="mb-3 ">
                <label className="block text-gray-700 font-bold mb-2">Variant of Offer:</label>
                <select name="variant" value={updatedOffer.variant} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-3 ">
            <OfferImageAdd onImageUrlChange={handleImageUrlChange} />
          </div>
          <div className="flex gap-5 justify-end">
            <button type="submit" className="w-64 bg-orange-500 text-white p-3 font-semibold shadow-xl rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600">Save Changes</button>
          </div>
          <div></div>
        </form>
      </div>
    </div>
    </div>
  );
}
