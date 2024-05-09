import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import Header from "../components/Header";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    if (
        (formData.email === "admin@example.com" && formData.password === "admin123") ||
        (formData.email === "admin" && formData.password === "admin")
      ) {
        navigate("/AdminDashboard");
      } else if (formData.email === "user@example.com" && formData.password === "user123") {
        navigate("/FruitCatelog");
      } else if (formData.email === "delivery@example.com" && formData.password === "udith123") {
        navigate("/DeliveryDashboard");
      } else {
        dispatch(signInFailure("Invalid email or password"));
      }
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');

      
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
           <Header/>
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-8">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email" onChange={handleChange} />
        <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5 ">
        <p className="font-normal text-lg">Don't have an account?</p>
        <Link to="/signup" className="font-medium text-lg">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
    </div>
  );
}
