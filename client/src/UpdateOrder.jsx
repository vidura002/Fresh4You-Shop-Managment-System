import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateOrder() {
  const { id } = useParams();
  const [fruit, setFruit] = useState();
  const [qty, setQuantity] = useState();
  const [date, setDate] = useState();
  const [supplier_id, setSupplier_id] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/getSupplierOrder/" + id)
      .then((result) => {
        console.log(result);
        setFruit(result.data.fruit);
        setQuantity(result.data.qty);
        setDate(result.data.date);
        setSupplier_id(result.data.supplier_id);
        setStatus(result.data.status);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/updateOrder/" + id, {
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
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
          <h2>Update Order</h2>
          <div className="mb-2">
            <label htmlFor="">Fruit</label>
            <input
              type="text"
              placeholder="Enter fruit name"
              className="form-control"
              value={fruit}
              onChange={(e) => setFruit(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Quantity</label>
            <input
              type="text"
              placeholder="Enter quantity(kg)"
              className="form-control"
              value={qty}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Date</label>
            <input
              type="text"
              placeholder="DD/MM/YEAR"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Supplier_id</label>
            <input
              type="text"
              placeholder="Enter supplier id"
              className="form-control"
              value={supplier_id}
              onChange={(e) => setSupplier_id(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Status</label>
            <input
              type="text"
              placeholder="Enter status"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateOrder;
