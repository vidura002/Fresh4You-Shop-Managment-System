import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulating authentication logic
        if (formData.email === "admin@example.com" && formData.password === "admin123") {
            // Successful admin sign-in
            navigate("/AdminDashboard");
        } else if (formData.email === "user@example.com" && formData.password === "user123") {
            // Successful user sign-in
            navigate("/FruitCatelog");
        } else {
            // Failed sign-in
            setError("Invalid email or password");
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
        <div className="p-3 max-w-lg mx-auto">
            
            <h1 className="text-4xl text-center font-semibold my-16">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="border p-3 rounded-lg" id="email" value={formData.email} onChange={handleChange} required />
                <input type="password" placeholder="Password" className="border p-3 rounded-lg" id="password" value={formData.password} onChange={handleChange} required />
                <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95" disabled={loading}>
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p className="font-normal text-lg">Don't have an account?</p>
                <Link to={'/signup'} className="font-medium text-lg">
                    <span className="text-blue-700">Sign Up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
        </div>
    );
}
