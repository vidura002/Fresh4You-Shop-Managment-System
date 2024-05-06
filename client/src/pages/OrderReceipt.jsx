import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderReceipt = ({ order }) => {
  const location = useLocation();
  const [pdfLoading, setPdfLoading] = useState(false);

  const data = location.state;

  const downloadReceipt = async () => {
    try {
      setPdfLoading(true);

      const doc = new jsPDF();
      const receipt = document.getElementById("receipt");
      const canvas = await html2canvas(receipt);
      const imageData = canvas.toDataURL("image/png");
      doc.addImage(imageData, "PNG", 10, 10, 190, 0);
      doc.save(`${data?._id}-${data?.user}.pdf`);

      setPdfLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="page-container" style={{ backgroundColor: "C5FF95" }}>
        <div
          id="receipt"
          className="bg-white border rounded-lg shadow-lg px-6 py-8"
        >
          <h1 className="font-bold text-3xl text-center text-blue-600 mb-4">
            Fresh 4 You
          </h1>
          <hr className="mb-6" />
          <div className="flex justify-between mb-6">
            <h1 className="text-lg font-bold">Order Receipt</h1>
            <div className="text-gray-700  flex flex-col justify-end items-end">
              <div>Date: {data?.createdAt.split("T")[0]}</div>
              <div>Receipt No#: {data?._id}</div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Bill To:</h2>
            <div className="text-gray-700 mb-2">{data?.user}</div>
            <div className="text-gray-700 mb-2">{data?.address}</div>
          </div>
          <table className="w-full mb-8">
            <thead>
              <tr>
                <th className="text-left font-bold text-gray-700">
                  Description
                </th>
                <th className="text-left font-bold text-gray-700">Quantity</th>
                <th className="text-right font-bold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((item, index) => (
                <tr key={index}>
                  <td className="text-left text-gray-700">{item.name}</td>
                  <td className="text-left text-gray-700">{item.qty}</td>
                  <td className="text-right text-gray-700">Rs.{item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="text-left font-bold text-gray-700">Total</td>
                <td></td>
                <td className="text-right font-bold text-gray-700">
                  Rs.{data?.total}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="text-gray-700 mb-2">Thank you for your business!</div>
          <div className="text-gray-700 text-sm">
            Please remit payment within 30 days.
          </div>
        </div>
        <div className="order-details text-center">
          <button
            onClick={downloadReceipt}
            disabled={pdfLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            {pdfLoading ? "Generating PDF..." : "Download Receipt"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderReceipt;
