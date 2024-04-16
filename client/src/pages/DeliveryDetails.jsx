import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import './App.css';
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import DeliveryFormTable from '../components/DeliveryFormTable';

axios.defaults.baseURL = "http://localhost:3000/";

function DeliveryDetails() {
    const [addSection, SetAddSection] = useState(false);
    const [formData, setFormData] = useState({
        deliveryId: "",
        orderId: "",
        name: "",
        method: "",
        status: ""
    });
    const [dataList, setDataList] = useState([]);

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/create", formData);
            console.log(data);
            if (data.success) {
                SetAddSection(false);
                alert(data.message);
                getFetchData();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getFetchData = async () => {
        try {
            const { data } = await axios.get("/");
            console.log(data);
            if (data.success) {
                setDataList(data.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getFetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete("/delete/" + id);
            alert(data.message);
            // After successful deletion, update the dataList to reflect the changes
            setDataList(prevData => prevData.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Header />
            <div className='container'>
                <button className='btn btn-add' onClick={() => SetAddSection(true)}>ADD</button>

                {addSection && (
                    <DeliveryFormTable
                        handleSubmit={handleSubmit}
                        handleOnChange={handleOnChange}
                        handleClose={() => SetAddSection(false)}
                    />
                )}
                <div className='tablecontainer'>
                    <table>
                        <thead>
                            <tr>
                                <th>DeliveryID</th>
                                <th>OrderID</th>
                                <th>Name</th>
                                <th>Method</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataList.length > 0 ? (
                                dataList.map((el) => (
                                    <tr key={el._id}>
                                        <td>{el.deliveryId}</td>
                                        <td>{el.orderId}</td>
                                        <td>{el.name}</td>
                                        <td>{el.method}</td>
                                        <td>{el.status}</td>
                                        <td>
                                            <button className='btn btn-edit'>Edit</button>
                                            <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>No Data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default DeliveryDetails;
