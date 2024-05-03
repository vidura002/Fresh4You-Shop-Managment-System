import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import "../pages/App.css";

const DeliveryFormTable = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
    const handleStatusChange = (e) => {
        const { value } = e.target;
        // Call the handleOnChange function only for the status field
        handleOnChange({ target: { name: 'status', value } });
    };

    return (
        <div className='addContainer'>
            <form onSubmit={handleSubmit}>
                <div className='close-btn' onClick={handleClose}><IoCloseSharp /></div>

                {/* Keep the name and method fields unchanged */}
                <label htmlFor="name">Name:</label>
                <input type="text" id='name' name="name" onChange={handleOnChange} value={rest.name}/>

                <label htmlFor="method">Method:</label>
                <input type="text" id='method' name="method" onChange={handleOnChange} value={rest.method} />

                {/* Render the select dropdown for the status field */}
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" value={rest.status} onChange={handleStatusChange}>
                    <option value="">Select Status</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                </select>

                <button className='btn'>Submit</button>
            </form>
        </div>
    );
}

export default DeliveryFormTable;
