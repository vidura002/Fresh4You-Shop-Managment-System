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
  const [error, setError] = useState(false);
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
      setError(false);
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
      if (data.success === false) {
        setError(data.message);
      }
      alert('Feedback created successfully!');
      formData.name = '';
      formData.email = '';
      formData.message = '';

      navigate('/create-feedback');
    } catch (err) {
      setError(err.message);
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
      if (data.success === false) {
        return;
      }
      setUserFeedback(data); // Set the fetched data to userFeedback state
    } catch (error) {
      console.error('Error fetching feedback:', error);
      // Handle error, maybe set an error state or display an error message
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-10'>
      <h1 className='text-2xl font-bold text-slate-700'>Create Feedback</h1>
      <form onSubmit={handleSubmit} className='mt-5'>
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            placeholder='Name'
            className='bg-slate-100 p-3 rounded-lg'
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <input
            type='email'
            placeholder='Email'
            className='bg-slate-100 p-3 rounded-lg'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <div className='flex justify-center space-x-2'>
            {[1, 2, 3, 4, 5].map((value) => (
              <StarIcon
                key={value}
                filled={value <= rating}
                onClick={() => handleRatingChange(value)}
              />
            ))}
          </div>

          <textarea
            placeholder='Message'
            className='bg-slate-100 p-3 rounded-lg'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <button
            type='submit'
            className='bg-slate-700 text-white p-3 rounded-lg'
          >
            Create Feedback
          </button>
        </div>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      <div className='mt-5'>
        <button
          onClick={handleShowListings}
          className='w-full bg-green-700 text-white p-3 rounded-lg my-2 uppercase hover:opacity-45 disabled:opacity-30'
        >
          View Feedback
        </button>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {userFeedback && userFeedback.length === 0 && !loading && (
          <p className='text-center my-7 text-2xl'>No feedback found!</p>
        )}
        {userFeedback && userFeedback.length > 0 && !loading && (
          <div>
            <p className='text-center my-7 text-2xl'>Feedback</p>
            {userFeedback.map((feedback) => (
              <Link to={`/Feedback/${feedback._id}`} key={feedback._id}>
                <div
                  key={feedback._id}
                  className='bg-slate-100 p-3 my-3 rounded-lg'
                >
                  <p className='text-center'>{feedback.name}</p>
                  <p className='text-center'>{feedback.email}</p>
                  <p className='text-center'>{feedback.message}</p>
                  <p className='text-center'>Rating: {feedback.rating}</p>

                  <div className='flex justify-end gap-9'>
                    <button
                      className='w-30 bg-green-700 text-white p-3 rounded-lg my-2 uppercase hover:opacity-45 disabled:opacity-30'
                    >
                      edit
                    </button>
                    <button
                      className='w-30 bg-red-700 text-white p-3 rounded-lg my-2 uppercase hover:opacity-45 disabled:opacity-30'
                    >
                      delete
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
