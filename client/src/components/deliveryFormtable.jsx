import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import "../pages/App.css";

const DeliveryFormTable = ({ handleSubmit, handleOnChange, handleClose }) => {
    return (
        <div className='addContainer'>
            <form onSubmit={handleSubmit}>
                <div className='close-btn' onClick={handleClose}><IoCloseSharp /></div>

                <label htmlFor="deliveryId">DeliveryID:</label>
                <input type="number" id='deliveryId' name="deliveryId" onChange={handleOnChange} />

                <label htmlFor="orderId">OrderID:</label>
                <input type="text" id='orderId' name="orderId" onChange={handleOnChange} />

                <label htmlFor="name">Name:</label>
                <input type="text" id='name' name="name" onChange={handleOnChange} />

                <label htmlFor="method">Method:</label>
                <input type="text" id='method' name="method" onChange={handleOnChange} />

                <label htmlFor="status">Status:</label>
                <input type="text" id='status' name="status" onChange={handleOnChange} />

                <button className='btn'>Submit</button>
            </form>
        </div>
    );
}

export default DeliveryFormTable;
