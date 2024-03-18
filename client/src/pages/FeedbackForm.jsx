import React, { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(3);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Form submitted:', { name, email, rating, comments });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-400 to-green-600">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Feedback Form</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">Name</label>
          <input type="text" id="name" className="p-3 w-72 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">Email</label>
          <input type="email" id="email" className="p-3 w-72 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-800 mb-2">Rating</label>
          <select id="rating" className="p-3 w-72 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="comments" className="block text-sm font-medium text-gray-800 mb-2">Comments</label>
          <textarea id="comments" className="p-3 w-72 h-32 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500" value={comments} onChange={(e) => setComments(e.target.value)} required />
        </div>
        <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Submit</button>
      </form>
    </div>
  );
}
