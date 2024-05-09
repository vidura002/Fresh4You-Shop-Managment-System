import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import './App.css';
import axios from "axios";
import { Link } from 'react-router-dom';
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
            const { data } = await axios.post("/api/delivery/create", formData);
            console.log(data);
            if (data.success) {
                SetAddSection(false);
                alert(data.message);
                getFetchData(); // Fetch data after adding a new entry
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getFetchData = async () => {
        try {
            const { data } = await axios.get("/api/delivery"); // Fetch data from the correct backend endpoint
            console.log(data);
            if (data.success) {
                setDataList(data.data);
            } else {
                console.error("Error fetching data:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getFetchData(); // Fetch data when the component mounts
    }, []);

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete("/api/delivery/delete/" + id);
            alert(data.message);
            setDataList(prevData => prevData.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put("/api/delivery/update/", formDataEdit);
            if(data.success){
                getFetchData()
                alert(data.message)
                setEditSection(false)
            }
        } catch (error) {
            console.error("Error:", error);
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
                        <Link
                to="/DeliveryDashboard"
                type="viewOrder"
                className="w-20 bg-blue-500 ml-64 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded"
            >
                Back
            </Link><br></br>
            <div className='flex gap-5'>
            <button className='btn btn-add ' onClick={() => SetAddSection(true)}>ADD</button>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-bar mr-64 w-64"
                        />
            </div>
                        
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

                    <div className=' tablecontainer place-content-center flex justify-center w-screen'>
                    <table className='divide-y divide-gray-200 ml-48 mr-48'>
    <thead className='bg-gray-50 h-12'>
        <tr>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>DeliveryID</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Method</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
            <th className='px-6 py-3'></th>
        </tr>
    </thead>
    <tbody className='bg-white divide-y divide-gray-200'>
        {filteredDataList.length > 0 ? (
            filteredDataList.map((el) => (
                <tr key={el._id}>
                    <td className='px-6 py-4 whitespace-nowrap'>{el._id}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{el.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{el.method}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{el.status}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                        <button className='btn btn-edit border-b-amber-500' onClick={() => handleEdit(el)}>Edit</button>
                        <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="5" className='px-6 py-4 text-center text-sm text-gray-500'>No Data</td>
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
