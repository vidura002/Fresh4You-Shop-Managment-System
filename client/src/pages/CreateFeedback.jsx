import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Define star icon components
const StarIcon = ({ filled, onClick }) => (
  <span
    className={`cursor-pointer ${filled ? 'text-yellow-500' : 'text-gray-300'
      } text-3xl`} // Adjust the font size here, e.g., text-3xl for larger icons
    onClick={onClick}
  >
    ★
  </span>
);

export default function FeedbackForm() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userFeedback, setUserFeedback] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [rating, setRating] = useState(0); // New state for rating

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/feedback/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
          rating, // Include rating in the request body
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      } else {
        alert('Feedback created successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        navigate('/create-feedback');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle rating changes
  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/feedback/getUid/${currentUser._id}`);
      const data = await res.json();
      if (!data.success) {
        return;
      }
      setUserFeedback(data); // Set the fetched data to userFeedback state
    } catch (error) {
      console.error('Error fetching feedback:', error);
      // Handle error, maybe set an error state or display an error message
    }
  };

  return (
    <div className='max-w-lg mx-auto mt-10 bg-green-50 shadow-md p-8 rounded-lg'>
      <h1 className='text-3xl font-bold text-black mb-6 text-center'>Give Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-black text-sm font-bold mb-2'>Name</label>
          <input
            type='text'
            placeholder='Enter your name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>
        <div className='mb-4'>
          <label className='block text-black text-sm font-bold mb-2'>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className='mb-4'>
          <label className='block text-black text-sm font-bold mb-2'>Rating</label>
          <div className='flex items-center'>
            {[1, 2, 3, 4, 5].map((value) => (
              <StarIcon
                key={value}
                filled={value <= rating}
                onClick={() => handleRatingChange(value)}
              />
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <label className='block text-black text-sm font-bold mb-2'>Message</label>
          <textarea
            placeholder='Enter your message'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </div>
        <button
          type='submit'
          className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block mx-auto'
          disabled={loading}
        >
          {loading ? 'Submitting Feedback...' : 'Submit Feedback'}
        </button>
      </form>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
      <div className='mt-8 text-center'>
        <button
          onClick={handleShowListings}
          className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          View Feedback
        </button>
        {loading && <p className='text-center my-7 text-xl'>Loading...</p>}
        {userFeedback.length === 0 && !loading && (
          <p className='text-center my-7 text-xl'>No feedback found!</p>
        )}
        {userFeedback.length > 0 && !loading && (
          <div>
            <p className='text-center my-7 text-xl'>Feedback</p>
            {userFeedback.map((feedback) => (
              <Link to={`/Feedback/${feedback._id}`} key={feedback._id}>
                <div
                  key={feedback._id}
                  className='bg-green-100 p-4 my-4 rounded-lg'
                >
                  <p className='text-center font-semibold text-black'>{feedback.name}</p>
                  <p className='text-center text-black'>{feedback.email}</p>
                  <p className='text-center mt-2 text-black'>{feedback.message}</p>
                  <p className='text-center mt-2 text-black'>Rating: {feedback.rating}</p>

                  <div className='flex justify-end mt-4'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                      Edit
                    </button>
                    <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2'>
                      Delete
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
