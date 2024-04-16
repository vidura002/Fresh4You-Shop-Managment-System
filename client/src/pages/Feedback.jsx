import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StarIcon = ({ filled, onClick }) => (
  <span
    className={`cursor-pointer ${filled ? 'text-yellow-500' : 'text-gray-300'
      } text-3xl`}
    onClick={onClick}
  >
    ★
  </span>
);

export default function Feedback() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0, // New state for rating
  });
  const [status, setStatus] = useState('Pending'); // State for status
  const params = useParams();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/feedback/get/${params.Id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setFormData({
          name: data.name,
          email: data.email,
          message: data.message,
          rating: data.rating, // Set the initial rating from fetched data
        });
        setStatus(data.status); // Set the status from fetched data
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [params.Id]);

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value }); // Update rating in form data
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/feedback/update/${params.Id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, status: 'Pending' }), // Update status to Pending here
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setListing(data);
      setStatus('Pending'); // Update the status state to Pending as well
      navigate('/create-feedback');
    } catch (error) {
      setError(true);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/feedback/delete/${params.Id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      setListing(null);
      navigate('/create-feedback');
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className='min-h-screen bg-cover bg-center' style={{backgroundImage: "url(src/images/bc2.jpg)" }}>
      <main className="py-8">
        
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Error occurred.</p>}
        {listing && (
          
          <div className='max-w-3xl mx-auto mt-10'   >
            <h1 className='text-2xl font-bold text-slate-700'>Edit Feedback</h1>
            <p className="text-center">Status: {status}</p> {/* Display the status here */}
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
                    filled={value <= formData.rating}
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
                onClick={handleEdit}
                className='bg-slate-700 text-white p-3 rounded-lg'
              >
                Edit Feedback
              </button>

              <button
                onClick={handleDelete}
                className='bg-red-700 text-white p-3 rounded-lg'
              >
                Delete Feedback
              </button>
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}
