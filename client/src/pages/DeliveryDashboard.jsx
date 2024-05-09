import React from 'react'
import Header from "../components/Header";
import { Link } from 'react-router-dom';



function DeliveryDashboard() {
  return (


<div>
    <Header />
    <div className="min-h-svh bg-[url('./images/delivery.jpg')]  bg-cover bg-left screens-md">
        <div className='p-20' >
            <span className='text-5xl font-semibold'>Welcome to Delivery Dashboard!</span>
            <h1 className='grid grid-cols-2 text-3xl text-justify antialiased'><br/><br/> "Welcome to our Delivery Dashboard" This is command center for streamlined delivery management. Stay informed, stay efficient, and stay ahead with our intuitive dashboard.<br/></h1><br/>
            <div className='flex gap-5'>
            <Link
                to="/DeliveryDetails"
                type="viewOrder"
                className="w-80 h-16 text-center place-content-center bg-orange-500 text-2xl hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow-xl"
            >
                Delivery
            </Link><br></br>
            <Link
                type="viewOrder"
                className="w-80 bg-orange-500 place-content-center text-center text-2xl  hover:bg-orange-700 text-white font-bold py-2 px-4 rounded shadow-xl border-spacing-9"
            >
                View Order
            </Link>
            </div>
        </div>
    </div>   
</div>

  )
}

export default DeliveryDashboard