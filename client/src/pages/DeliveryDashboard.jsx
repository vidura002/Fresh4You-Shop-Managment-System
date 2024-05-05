import React from 'react'
import Header from "../components/Header";



function DeliveryDashboard() {
  return (


<div>
    <Header />
    <div className="min-h-svh bg-[url('images/delivery.jpg')] bg-left bg-cover bg-right screens-md">
        <div className='p-32' >
            <span className='text-6xl font-semibold'>Welcome to DashBoard!</span>
            <h1 className='grid grid-cols-2 text-3xl text-justify antialiased'><br/><br/> The Deliverer Dashboard is now available! This is your main hub for effectively tracking and managing your delivery tasks. This is where you can monitor and approve incoming delivery requests, follow the status of assigned deliveries in real time, and get in touch with clients or customer service representatives as needed. Remain informed, remain organised, and present with assurance!"<br/></h1><br/>
            <button
                type="viewOrder"
                className="w-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                View Order
            </button>
        </div>
    </div>   
</div>

  )
}

export default DeliveryDashboard