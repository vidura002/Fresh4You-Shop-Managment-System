import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from "./components/AdminNavBar";
import AdminSideBar from "./components/AdminSideBar";


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
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: "url(src/pages/assest/orange.jpg)"}}>
    {/*<div className="d-flex vh-100 bg-primary justify-content-center align-items-center">*/}
    {/*<div>
      <AdminNavBar />
  </div>*/}
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-4"></div>
      <div className="w-50 bg-white rounded p-3 mx-auto">
        
        {/*<div className="grid-col-1 lg:col-span-2 md:col-span-3">
          <AdminSideBar />
</div>*/}
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
                      className="btn btn-success mr-2"
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
    {/*</div>*/}
    </div>
   
  );
}

export default SupplierOrders;

