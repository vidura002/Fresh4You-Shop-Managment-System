import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const OrderReceipt = ({ order }) => {
  const location = useLocation();
  const [pdfLoading, setPdfLoading] = useState(false);

  const data = location.state;

  const downloadReceipt = async () => {
    try {
      setPdfLoading(true);

      // Create a new PDF document
      const doc = new jsPDF();

      // Capture the HTML content of the receipt component
      const receipt = document.getElementById("receipt");
      const canvas = await html2canvas(receipt);

      // Convert the HTML content to an image
      const imageData = canvas.toDataURL("image/png");

      // Add the image to the PDF document
      doc.addImage(imageData, "PNG", 10, 10, 190, 0);

      // Save the PDF document
      doc.save(`${data?._id}-${data?.user}.pdf`);

      setPdfLoading(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfLoading(false);
    }
  };

  return (
    <>
      <div id="receipt">
        <div class="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-5xl mx-auto mt-8">
          <h1 class="font-bold text-2xl my-4 text-center text-blue-600">
            KRP Services
          </h1>
          <hr class="mb-2" />
          <div class="flex justify-between mb-6">
            <h1 class="text-lg font-bold">Invoice</h1>
            <div class="text-gray-700  flex flex-col justify-end items-end">
              <div>Date: {data?.createdAt.split("T")[0]}</div>
              <div>Invoice #: {data?._id}</div>
            </div>
          </div>
          <div class="mb-8">
            <h2 class="text-lg font-bold mb-4">Bill To:</h2>
            <div class="text-gray-700 mb-2">{data?.user}</div>
            <div class="text-gray-700 mb-2">{data?.address}</div>
          </div>
          <table class="w-full mb-8">
            <thead>
              <tr>
                <th class="text-left font-bold text-gray-700">Description</th>
                <th class="text-left font-bold text-gray-700">Quantity</th>
                <th class="text-right font-bold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((item) => (
                <tr>
                  <td class="text-left text-gray-700">{item.name}</td>
                  <td class="text-left text-gray-700">{item.qty}</td>
                  <td class="text-right text-gray-700">Rs.{item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td class="text-left font-bold text-gray-700">Total</td>
                <td class="text-right font-bold text-gray-700">
                  Rs.{data?.total}
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="text-gray-700 mb-2">Thank you for your business!</div>
          <div class="text-gray-700 text-sm">
            Please remit payment within 30 days.
          </div>
        </div>
      </div>
      <div className="order-details">
        {/* Your existing order details JSX */}
        <button
          onClick={downloadReceipt}
          disabled={pdfLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {pdfLoading ? "Generating PDF..." : "Download Receipt"}
        </button>
      </div>
    </>
  );
};

export default OrderReceipt;
