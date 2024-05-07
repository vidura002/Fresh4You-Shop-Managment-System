import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateOrder() {
  const [fruit, setFruit] = useState();
  const [qty, setQuantity] = useState();
  const [date, setDate] = useState(new Date());
  const [supplier_id, setSupplier_id] = useState();
  const [status, setStatus] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //define status options
  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Accepted", value: "Accepted" },
    { label: "Rejected", value: "Rejected" },
  ];

  const validateForm = () => {
    const errors = {};
    if (!fruit) {
      errors.fruit = "Please enter fruit name";
    }
    if (!qty) {
      errors.qty = "Please enter quantity";
    }
    if (!date) {
      errors.date = "Please select a date";
    }
    if (!supplier_id) {
      errors.supplier_id = "Please enter supplier id";
    }
    if (!status) {
      errors.status = "Please select status";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const Submit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:3000/createOrder", {
          fruit,
          qty,
          date,
          supplier_id,
          status,
        })
        .then((result) => {
          console.log(result);
          navigate("/supplier_orders");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(src/pages/assest/orange.jpg)" }}
    >
      {/*<div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>*/}
      <div className="w-50 bg-white rounded p-3 mx-auto">
        <form onSubmit={Submit}>
          <h8>
            <b>
              <center>Place Order</center>
            </b>
          </h8>
          <div className="mb-2">
            <label htmlFor="">Fruit</label>
            <input
              type="text"
              placeholder="Enter fruit name"
              className="form-control"
              onChange={(e) => setFruit(e.target.value)}
            />
            {errors.fruit && <p className="text-danger">{errors.fruit}</p>}
          </div>
          <div className="mb-2">
            <label htmlFor="">Quantity</label>
            <input
              type="text"
              placeholder="Enter quantity(kg)"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.qty && <p className="text-danger">{errors.qty}</p>}
          </div>
          <div className="mb-2">
            <label htmlFor="">Date</label>
            <br />
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
            {errors.date && <p className="text-danger">{errors.date}</p>}
          </div>
          <div className="mb-2">
            <label htmlFor="">Supplier_id</label>
            <input
              type="text"
              placeholder="Enter supplier id"
              className="form-control"
              onChange={(e) => setSupplier_id(e.target.value)}
            />
            {errors.supplier_id && (
              <p className="text-danger">{errors.supplier_id}</p>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">Status</label>
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status && <p className="text-danger">{errors.status}</p>}
          </div>
          <button className="btn btn-success">Place Order</button>
        </form>
      </div>

      {/*</div>*/}
    </div>
  );
}

export default CreateOrder;
