import React from 'react'
import { Link } from "react-router-dom";
import AdminDashboard from './AdminDashboard';
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
        <Header />
        <h1 className='hidden sm:inline text-red-700 hover:underline text-3xl self-auto'>Home</h1><br/>
        <Link to={`AdminDashboard`}>Click</Link>
    </div>
    
  
  )
}
