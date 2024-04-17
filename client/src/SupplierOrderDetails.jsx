import React, { useEffect, useState } from "react";
import axios from "axios";

function SupplierOrderDetails() {
  const [supplierOrderDetails, setSupplierOrderDetails] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/supplier_orders")
      .then((result) => setSupplierOrderDetails(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <table className="table">
          <thead>
            <tr>
              <th>Fruit</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Supplier_id</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {supplierOrderDetails.map((supplierOrderDetail) => {
              return (
                <tr>
                  <td>{supplierOrderDetail.fruit}</td>
                  <td>{supplierOrderDetail.qty}</td>
                  <td>{supplierOrderDetail.date}</td>
                  <td>{supplierOrderDetail.supplier_id}</td>
                  <td>{supplierOrderDetail.status}</td>
                  <td>
                    <button>Accept</button>
                    <button>Reject</button>
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

export default SupplierOrderDetails;
