import React, { useEffect, useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/feedback/get');
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        setLoading(false);
        return;
      }
      setFeedbacks(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/feedback/approve/${id}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to approve feedback');
      }
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === id ? { ...feedback, status: 'Approved' } : feedback
        )
      );
    } catch (error) {
      console.error('Error approving feedback:', error);
      setError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/feedback/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback._id !== id)
      );
    } catch (error) {
      setError(true);
    }
  };

  const generateReport = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      let currentPage = pdfDoc.addPage();
      let y = currentPage.getHeight() - 50;
      const lineHeight = 15;

      feedbacks.forEach((feedback) => {
        const contentLines = [
          `Name: ${feedback.name}`,
          `Email: ${feedback.email}`,
          `Message: ${feedback.message}`,
          `Rating: ${feedback.rating}`,
          `Status: ${feedback.status}`,
          '-------------------------------------------',
        ];

        const contentHeight = contentLines.length * lineHeight;

        if (y < contentHeight) {
          currentPage = pdfDoc.addPage();
          y = currentPage.getHeight() - 50;
        }

        contentLines.forEach((line) => {
          currentPage.drawText(line, { x: 50, y: y, size: 12, color: rgb(0, 0, 0) });
          y -= lineHeight;
        });

        y -= 10;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'feedback_report.pdf';
      link.click();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleSearch = () => {
    const filteredFeedbacks = feedbacks.filter((feedback) =>
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFeedbacks(filteredFeedbacks);
  };

  const resetSearch = () => {
    setSearchTerm('');
    fetchFeedbacks();
  };

  return (
    <div className='max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold text-slate-700 mb-6'>Admin Dashboard</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:ring focus:border-blue-300">
            Search
          </button>
          <button onClick={resetSearch} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300">
            Reset
          </button>
        </div>
        <button onClick={generateReport} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300">
          Generate Report
        </button>
      </div>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl text-red-500'>Error fetching data</p>}
      <table className='w-full border-collapse border border-gray-200'>
        <thead>
          <tr className="bg-gray-100">
            <th className='border border-gray-300 p-2'>Name</th>
            <th className='border border-gray-300 p-2'>Email</th>
            <th className='border border-gray-300 p-2'>Message</th>
            <th className='border border-gray-300 p-2'>Rating</th>
            <th className='border border-gray-300 p-2'>Status</th>
            <th className='border border-gray-300 p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td className='border border-gray-300 p-2'>{feedback.name}</td>
              <td className='border border-gray-300 p-2'>{feedback.email}</td>
              <td className='border border-gray-300 p-2'>{feedback.message}</td>
              <td className='border border-gray-300 p-2'>{feedback.rating}</td>
              <td className='border border-gray-300 p-2'>{feedback.status}</td>
              <td className='border border-gray-300 p-2'>
                {feedback.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(feedback._id)}
                      className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300'
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDelete(feedback._id)}
                      className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
