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
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#4dc005', color: 'black' }}>
      <form onSubmit={handleSubmit} className="max-w-md p-6 bg-white shadow-md rounded-lg" style={{ color: 'black', backgroundSize: 'cover' }}>
        <h2 className="text-2xl font-semibold mb-4">Feedback Form</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium" style={{ color: 'black' }}>Name</label>
          <input type="text" id="name" className="mt-1 p-2 w-full border rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium" style={{ color: 'black' }}>Email</label>
          <input type="email" id="email" className="mt-1 p-2 w-full border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium" style={{ color: 'black' }}>Rating</label>
          <select id="rating" className="mt-1 p-2 w-full border rounded-md" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="comments" className="block text-sm font-medium" style={{ color: 'black' }}>Comments</label>
          <textarea id="comments" className="mt-1 p-2 w-full border rounded-md" value={comments} onChange={(e) => setComments(e.target.value)} required />
        </div>
        <button type="submit" className="px-4 py-2 bg-yellow-600 text-black rounded-md hover:bg-yellow-700" style={{ color: '#959A04' }}>Submit</button>
      </form>
    </div>
  );
}
