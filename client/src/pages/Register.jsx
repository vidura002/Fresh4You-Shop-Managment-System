import { data } from "autoprefixer";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import OAuth from "../components/OAuth";
import Header from "../components/Header";

export default function Register() {

    const [formData, setFormData] = useState({});//[state,setState
    const [error , setError] = useState(null);//[state,setState
    const [loading , setLoading] = useState(false);//[state,setState
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value // [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            setLoading(true);
        const res = await fetch('/api/auth/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);
        if(data.success == false){
            setLoading(false);
            setError(data.message);
            return;
        }
        setLoading(false);
        setError(null);
        navigate('/signin');

        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

  return (
    <div>
            <Header />
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-4xl text-center font-semibold my-12">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" onChange={handleChange}  required/>
            <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
            <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" minLength={8} maxLength={16} onChange={handleChange}/>
            <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                {loading ? 'Loading...' : 'Sign Up'}
                </button>
                <OAuth />
        </form>
        <div className="flex gap-2 mt-5 ">
            <p className="font-normal text-lg">Have an account?</p>
            <Link to={'/signin'} className="font-medium text-lg">
                <span className="text-blue-700">Sign In</span>
            </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
    </div>
  )
}
