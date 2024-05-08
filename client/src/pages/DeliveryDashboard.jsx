import React from 'react'
import Header from "../components/Header";
import { Link } from 'react-router-dom';



function DeliveryDashboard() {
  return (


<div>
    <Header />
    <div className="min-h-svh bg-[url('images/delivery.jpg')] bg-left bg-cover bg-left screens-md">
        <div className='p-32' >
            <span className='text-5xl font-semibold'>Welcome to DashBoard!</span>
            <h1 className='grid grid-cols-2 text-3xl text-justify antialiased'><br/><br/> "Welcome to our Delivery Dashboard" This is command center for streamlined delivery management. Stay informed, stay efficient, and stay ahead with our intuitive dashboard.<br/></h1><br/>
            
            <button
                type="viewOrder"
                className="w-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Delivery
            </button>
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