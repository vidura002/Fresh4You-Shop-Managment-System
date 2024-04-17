import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function OfferGenerateReport() {
  const location = useLocation();
  const { searchResults } = location.state;

  const generateReport = () => {
    // Create new jsPDF instance
    const doc = new jsPDF();

    // Define the column headers and rows for the table
    const title = "Offer Report"
    const headers = ["ID", "Name", "Price", "Variant", "Quantity", "Description"];
    const rows = searchResults.map((offer) => [
      offer.offerID,
      offer.name,
      `Rs${offer.price}.00`,
      offer.variant,
      offer.quantity,
      offer.description
    ]);

    // Define Tailwind CSS styles for the table
    const styles = {
      headStyles: {
        fillColor: "#6B7280", // Tailwind gray-500 background color for header
        textColor: "#FFFFFF", // Tailwind white text color for header
        fontSize: 12,
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: "#111827", // Tailwind black text color for body
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: "#F3F4F6", // Tailwind gray-100 background color for alternate rows
      }
    };
    doc.text(title, 14, 10);
    // Set table column widths and add the table to the PDF
    doc.autoTable({ head: [headers], body: rows, styles });

    // Save PDF
    doc.save('offer_report.pdf');
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Offer Report</h1>
      <button
        onClick={generateReport}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download PDF
      </button>
    </div>
  );
}
