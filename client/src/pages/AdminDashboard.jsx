import React from 'react'
import AdminSideBar from '../components/adminSideBar'
import AdminNavBar from '../components/AdminNavBar'


function AdminDashboard() {
  return (
    <div>
        <div><AdminNavBar/></div>
        <div className="grid grid gap-4 sm:grid-cols-12">
          <div className="col-span-2"><AdminSideBar/></div>

          <div className="col-span-10 h-max text-black">
            <h1>Admin Dashboard</h1>
          </div>
          
        </div>
    </div>
  )
}

export default AdminDashboard