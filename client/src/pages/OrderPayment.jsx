import React, { useState } from "react";
import mastercard from "../assest/mc.png";
import paypal from "../assest/pp.png";
import visa from "../assest/vi.png";
import "../index.css";
import backgroundPhoto from "../assest/fruit2.png";

const OrderPayment = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    shoppingAddress: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Custom validation logic
    let error = {};
    if (name === "cardNumber" && !/^\d{16}$/.test(value)) {
      error.cardNumber = "Invalid card number";
    } else if (name === "cvv" && !/^\d{3}$/.test(value)) {
      error.cvv = "Invalid CVV";
    }

    setErrors({ ...errors, ...error });

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Proceed with submission
    try {
      const response = await fetch("/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      console.log("Payment successful");
    } catch (error) {
      console.error("Error processing payment:", error.message);
    }
  };

  return (
    <div
      className="paymentcontainer"
      style={{ backgroundImage: `url(${backgroundPhoto})` }}
    >
      <form onSubmit={handleSubmit}>
        <h1>Payment Form</h1>
        <div className="flex gap-4">
          {" "}
          <img src={mastercard} height={20} width={60} alt="Mastercard" />
          <img src={paypal} height={20} width={60} alt="Paypal" />
          <img src={visa} height={20} width={60} alt="Visa" />
        </div>
        <div className="cardNumber">
          <h2>Card Number :</h2>
          <div className="input-field">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
          </div>
        </div>
        <div className="row">
          <div className="cvv">
            <h2>CVV :</h2>
            <div className="input-field">
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
              {errors.cvv && <p className="error">{errors.cvv}</p>}
            </div>
          </div>
          <div className="expiryDate">
            <h2>Expiry Date :</h2>
            <div className="selection">
              <div className="date flex gap-1 ">
                {" "}
                <select
                  name="expiryDate"
                  id="months"
                  className="input-border"
                  onChange={handleChange}
                  required
                >
                  <option value=""> </option>
                  <option value="jan">Jan</option>
                  <option value="feb">Feb</option>
                  <option value="mar">Mar</option>
                  <option value="apr">Apr</option>
                  <option value="may">May</option>
                  <option value="jun">Jun</option>
                  <option value="jul">Jul</option>
                  <option value="aug">Aug</option>
                  <option value="sep">Sep</option>
                  <option value="oct">Oct</option>
                  <option value="nov">Nov</option>
                  <option value="dec">Dec</option>
                </select>
                <select
                  name="expiryDate"
                  id="years"
                  className="input-border"
                  onChange={handleChange}
                  required
                >
                  <option value=""> </option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="shoppingAddress">
          {" "}
          <h2>Shopping Address :</h2>
          <div className="input-field">
            <input
              type="text"
              id="shoppingAddress"
              name="shoppingAddress"
              value={formData.shoppingAddress}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button type="submit">Pay Now</button>
        </div>
      </form>
    </div>
  );
};

export default OrderPayment;