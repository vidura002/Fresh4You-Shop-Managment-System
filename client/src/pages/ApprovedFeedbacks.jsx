import React, { useEffect, useState } from 'react';

const StarIcon = ({ filled, onClick }) => (
  <span
    className={`cursor-pointer ${filled ? 'text-yellow-500' : 'text-gray-300'
        } text-3xl`} // Adjust the font size here, e.g., text-3xl for larger icons
    onClick={onClick}
  >
    ★
  </span>
);

const ApprovedFeedbacks = () => {
  const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchApprovedFeedbacks = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/feedback/approvedFeedbacks');
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setApprovedFeedbacks(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchApprovedFeedbacks();
  }, []);

  return (
    <main>
        <div className=' min-h-screen bg-cover bg-center' style={{backgroundImage: "url(src/images/bc4.jpeg)"}}> 
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {loading && <p className='text-center text-2xl'>Loading...</p>}
        {error && <p className='text-center text-2xl text-red-500'>Error occurred. Please try again later.</p>}
        {approvedFeedbacks && approvedFeedbacks.length > 0 && (
          <div>
            <h2 className='text-3xl font-bold text-center uppercase bg-gradient-to-r from-green-500 from-10% via-lime-500 via-30% to-teal-500 to-90%
 text-teal-50 mb-6'>Feedback And Review</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {approvedFeedbacks.map((feedback, index) => (
                <div key={index} className='bg-white bg-opacity-50 p-6 rounded-lg shadow-md flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <h3 className='text-lg font-semibold text-slate-600'>{feedback.name}</h3>
                    <span className='text-sm text-gray-500'>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className='text-gray-800'>{feedback.message}</p>
                  <div className='flex justify-start'>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <StarIcon
                        key={value}
                        filled={value <= feedback.rating}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {approvedFeedbacks.length === 0 && !loading && (
          <p className='text-center text-2xl text-gray-600'>No feedbacks available.</p>
        )}
      </div>
      </div>
    </main>
  );
};

export default ApprovedFeedbacks;
