import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import './App.css';
import axios from "axios";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import DeliveryFormTable from '../components/deliveryFormtable.jsx';

axios.defaults.baseURL = "http://localhost:3000/";

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 0,
  lng: 0,
};

function DeliveryDetails() {
    const [addSection, SetAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        method: "",
        status: ""
    });

    const [formDataEdit, setFormDataEdit] = useState({
        name: "",
        method: "",
        status: "",
        _id : ""
    });
    const [dataList, setDataList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentLocation, setCurrentLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch current location when component mounts
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error fetching location:', error);
                setErrorMessage('Error fetching location');
            }
        );
    }, []);

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        // Check if the value contains any numbers
        if (name === "name" && /\d/.test(value)) {
            alert("Name cannot contain numbers.");
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = (el) => {
        setFormDataEdit({ ...el }); 
        setEditSection(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, method, status } = formData;

        // Check if any field is empty
        if (!name || !method || !status) {
            alert("Please fill in all fields.");
            return;
        }

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
            setDataList(prevData => prevData.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = await axios.put("/update/", formDataEdit);
        if(data.data.success){
            getFetchData()
            alert(data.data.message)
            setEditSection(false)
        }
    }

    const handleEditOnChange = async (e) => {
        const { value, name } = e.target;
        setFormDataEdit((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const filteredDataList = dataList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className='min-h-screen bg-cover bg-center' style={{backgroundImage: "url(src/images/bg.png)"}}>
                <div className='container'>
                    <div className="button-and-search">
                        {/* Add a button for generating details */}
                        <button className='btn btn-add' onClick={() => SetAddSection(true)}>ADD</button>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-bar"
                        />
                    </div>

                    {addSection && (
                        <DeliveryFormTable
                            handleSubmit={handleSubmit}
                            handleOnChange={handleOnChange}
                            handleClose={() => SetAddSection(false)}
                            rest={formData}
                        />
                    )}

                    {
                        editSection && (
                            <DeliveryFormTable
                                handleSubmit={handleUpdate}
                                handleOnChange={handleEditOnChange}
                                handleClose={() => setEditSection(false)}
                                rest={formDataEdit}
                            />
                        )
                    }

                    <div className='tablecontainer'>
                        <table>
                            <thead>
                                <tr>
                                    <th>DeliveryID</th>
                                    <th>Name</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDataList.length > 0 ? (
                                    filteredDataList.map((el) => (
                                        <tr key={el._id}>
                                            <td>{el._id}</td>
                                            <td>{el.name}</td>
                                            <td>{el.method}</td>
                                            <td>{el.status}</td>
                                            <td>
                                                <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                                                <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center" }}>No Data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeliveryDetails;
