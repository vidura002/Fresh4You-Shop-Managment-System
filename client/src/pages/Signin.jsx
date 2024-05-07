import { data } from "autoprefixer";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
     signInStart , 
     signInSuccess , 
     signInFailure 
    } from "../redux/user/userSlice";  
import OAuth from "../components/OAuth";


export default function Signin() {

    const [formData, setFormData] = useState({});//[state,setState
    const {loading , error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value // [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            dispatch(signInStart());
        const res = await fetch('/api/auth/signin',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data.role);
        if(data.success == false){
            dispatch(signInFailure(data.message));
            return;
        }
        dispatch(signInSuccess(data));
        // eslint-disable-next-line no-debugger
        debugger;
        if (data.role=="admin") {
            navigate('/AdminDashboard');
        } else if (data.role=="supplier"){
            navigate('/SupplierDashboard');


        } else {
            navigate('/')

        }
        

        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

  return (
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-4xl text-center font-semibold my-8">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange}/>
            <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange}/>
            <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                {loading ? 'Loading...' : 'Sign In'}
                </button>
                <OAuth />
        </form>
        <div className="flex gap-2 mt-5 ">
            <p className="font-normal text-lg">Don't have an account?</p>
            <Link to={'/signup'} className="font-medium text-lg">
                <span className="text-blue-700">Sign In</span>
            </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}