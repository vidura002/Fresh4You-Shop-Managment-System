import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useParams, useHistory } from "react-router-dom";

const OfferDetails = () => {
  const { id } = useParams(); // Extracting offer ID from URL params
  const history = useHistory();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    // Fetch offer details based on offer ID when component mounts
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/offer/${id}`);
        const { data } = response;
        setOffer(data);
      } catch (error) {
        console.error("Error fetching offer details:", error);
      }
    };

    fetchOffer();
  }, [id]);

  return (
    <div className="mt-10 ml-20 mr-20 p-10 bg-green-200 shadow-md rounded-md">
      <div className="flex gap-2">
        <Link to="/AdminOffer">
          <IoArrowBackCircleOutline className="text-4xl" />
        </Link>
        <h2 className="text-2xl font-semibold mb-4">Offer Information</h2>
      </div>
      {offer ? (
        <div>
          <p><strong>Name:</strong> {offer.name}</p>
          <p><strong>Price:</strong> {offer.price}</p>
          <p><strong>Variant:</strong> {offer.variant}</p>
          <p><strong>Quantity:</strong> {offer.quantity}</p>
          <p><strong>Description:</strong> {offer.description}</p>
          <p><strong>Image:</strong> {offer.image}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OfferDetails;
