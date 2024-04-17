import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SupplierOrders() {
  const [supplierorders, setSupplierOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/supplier_orders")
      .then((result) => setSupplierOrders(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/supplier_orders/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Fruit</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Supplier_id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {supplierorders.map((supplierorder) => {
              return (
                <tr key={supplierorder._id}>
                  <td>{supplierorder.fruit}</td>
                  <td>{supplierorder.qty}</td>
                  <td>{supplierorder.date}</td>
                  <td>{supplierorder.supplier_id}</td>
                  <td>{supplierorder.status}</td>
                  <td>
                    <Link
                      to={`/update/${supplierorder._id}`}
                      className="btn btn-success"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(supplierorder._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierOrders;
