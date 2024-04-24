import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function SupplierOrderDetails() {
  const [supplierOrderDetails, setSupplierOrderDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/supplier_orders")
      .then((result) => setSupplierOrderDetails(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDownloadPDF = () => {
    const table = document.getElementById("orderTable");

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save("receipt.pdf");
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(src/pages/assest/supplier.png)" }}
    >
      {/*} <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">*/}
      <div className="w-50 bg-white rounded p-3 mx-auto">
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
            {supplierOrderDetails.map((supplierOrderDetail, index) => {
              return (
                <tr key={index}>
                  <td>{supplierOrderDetail.fruit}</td>
                  <td>{supplierOrderDetail.qty}</td>
                  <td>{supplierOrderDetail.date}</td>
                  <td>{supplierOrderDetail.supplier_id}</td>
                  <td>{supplierOrderDetail.status}</td>
                  <td>
                    <button className="btn btn-success mr-2">Accept</button>
                    <button className="btn btn-danger">Reject</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={handleDownloadPDF}>
          Download Receipt
        </button>
      </div>
      {/*</div>*/}
    </div>
  );
}

export default SupplierOrderDetails;
