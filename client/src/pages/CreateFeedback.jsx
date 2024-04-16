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

export default function CreateFeedback() {
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
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      window.location.reload();
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
    <div className=' min-h-screen bg-cover bg-center' style={{backgroundImage: "url(src/images/bc1.jpg)"}}> 
    <div className='max-w-3xl mx-auto mt-10 p-8 rounded-lg shadow-md bg-white bg-opacity-50'>
    <h1 className='text-4xl underline decoration-4 font-serif font-bold bg-gradient-to-r from-green-500 to-green-700 text-white mb-8 text-center'>Create Feedback</h1>


      <form onSubmit={handleSubmit} className='mt-5'>
        <div className='flex flex-col space-y-4'>
          <input
            type='text'
            placeholder='Name'
            className='bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <input
            type='email'
            placeholder='Email'
            className='bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
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
            className='bg-gray-200 p-3 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <button
            type='submit'
            className='bg-blue-500 shadow-lg shadow-cyan-500/50  hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out'
          >
            Create Feedback
          </button>
        </div>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      <div className='mt-8'>
        <button
          onClick={handleShowListings}
          className='w-full bg-green-500 shadow-lg shadow-cyan-600/50  hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out'
        >
          View Feedback
        </button>
        {loading && <p className='text-center my-7 text-xl'>Loading...</p>}
        {userFeedback && userFeedback.length === 0 && !loading && (
          <p className='text-center my-7 text-xl'>No feedback found!</p>
        )}
        {userFeedback && userFeedback.length > 0 && !loading && (
          <div>
            <p className='text-center my-7 text-xl'>Feedback</p>
            {userFeedback.map((feedback) => (
              <Link to={`/Feedback/${feedback._id}`} key={feedback._id}>
                <div
                  key={feedback._id}
                  className='bg-gray-200 p-5 my-3 rounded-lg shadow-md'
                >
                  <p className='text-xl font-semibold mb-2'>{feedback.name}</p>
                  <p className='text-lg text-gray-600 mb-2'>{feedback.email}</p>
                  <p className='text-lg'>{feedback.message}</p>
                  <p className='text-lg mt-2'>Rating: {feedback.rating}</p>

                  <div className='flex justify-end gap-6 mt-4'>
                    <button
                      className='bg-yellow-500  hover:bg-yellow-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-300 ease-in-out'
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-semibold transition duration-300 ease-in-out'
                    >
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
    </div>
  );
}
