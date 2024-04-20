import React from 'react'
import AdminSideBar from "../components/AdminSideBar";
import AdminNavBar from '../components/AdminNavBar'


function AdminDashboard() {
  return (
    <div>
        <AdminNavBar/>
        <AdminSideBar/>
        <h1>Admin Dashboard</h1>
    </div>
  )
}

export default AdminDashboard