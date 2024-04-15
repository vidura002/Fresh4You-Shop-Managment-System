import React, { useState } from 'react'
import Header from "../components/Header";
import './App.css';
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/"

function DeliveryDetails() {

    const [addSection,SetAddSection] = useState(false)
    const [formData,setFormData] = useState({
        deliveryId : "",
        orderId : "",
        name : "",
        method : "",
        status : ""
    })

    const handleOnChange = (e)=>{
        const {value,name} = e.target
        setFormData((preve)=>{
            return{
                ...preve,
                [name] : value
            }

        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = await axios.post("/create",formData )
        console.log(data)
    }

  return (
    <><Header/>
        <div className='container'>
            <button className='btn btn-add' onClick={()=>SetAddSection(true)}>ADD </button>

            {
                addSection && (
                <div className='addContainer'>
                    
                    <form onSubmit={handleSubmit}>
                    <div className='close-btn' onClick={()=>SetAddSection(false)}><IoCloseSharp/></div>

                        <label htmlFor="deliveryId">DeliveryID :</label>
                        <input type="number" id='deliveryId' name="deliveryId" onChange={handleOnChange}/>

                        <label htmlFor="orderId">OrderID :</label>
                        <input type="text" id='orderId' name="orderId" onChange={handleOnChange}/>

                        <label htmlFor="name">Name :</label>
                        <input type="text" id='name' name="name" onChange={handleOnChange}/>

                        <label htmlFor="method">Method :</label>
                        <input type="text" id='method' name="method" onChange={handleOnChange}/>

                        <label htmlFor="status">Status :</label>
                        <input type="text" id='status' name="status" onChange={handleOnChange}/>

                        <button className='btn'>Submit</button>

                    </form>
                </div>
                )


            }

        
         </div>
    </>

  )
}

export default DeliveryDetails