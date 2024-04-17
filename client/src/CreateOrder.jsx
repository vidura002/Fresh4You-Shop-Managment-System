import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function CreateOrder () {
    const [fruit, setFruit] = useState()
    const [qty, setQuantity] = useState()
    const [date, setDate] = useState()
    const [supplier_id, setSupplier_id] = useState()
    const [status, setStatus] = useState()
    const navigate = useNavigate()
   

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/createOrder", {fruit, qty, date, supplier_id, status})
        .then(result => {
            console.log(result)
            navigate('/supplier_orders')
            
            
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
              <form onSubmit={Submit}>
                <h2>Place Order</h2>
                <div className="mb-2">
                    <label htmlFor="">Fruit</label>
                    <input type="text" placeholder="Enter fruit name" className="form-control"
                    onChange={(e) => setFruit(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Quantity</label>
                    <input type="text" placeholder="Enter quantity(kg)" className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Date</label>
                    <input type="text" placeholder="DD/MM/YEAR" className="form-control"
                    onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Supplier_id</label>
                    <input type="text" placeholder="Enter supplier id" className="form-control"
                    onChange={(e) => setSupplier_id(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Status</label>
                    <input type="text" placeholder="Enter status" className="form-control"
                    onChange={(e) => setStatus(e.target.value)}/>
                </div>
                <button className="btn btn-success">Place Order</button>
              </form>
            </div>
            
        </div>
    )
}

export default CreateOrder;

