import React, { useState, useEffect } from 'react';
import axios from "axios";
import AdminNavBar from '../components/AdminNavBar';
import AdminSideBar from '../components/adminSideBar';
import { jsPDF } from "jspdf";


axios.defaults.baseURL = "http://localhost:3000/";

function DAdm() {
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

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredDataList = dataList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleGenerateDetails = () => {
        // Generate text content
        const textContent = dataList.map(item => {
            return `DeliveryID: ${item._id}, Name: ${item.name}, Method: ${item.method}, Status: ${item.status}`;
        }).join('\n');

        // Create a Blob object from the text content
        const blob = new Blob([textContent], { type: 'text/plain' });

        // Create a temporary URL for the Blob object
        const url = window.URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;

        // Set the filename for the downloaded file
        link.setAttribute('download', 'delivery_details.txt');

        // Append the link to the document body
        document.body.appendChild(link);

        // Trigger the click event on the link to initiate the download
        link.click();

        // Clean up by revoking the URL object
        window.URL.revokeObjectURL(url);
    };


    return (
        <>
            
            <div>
                <AdminNavBar/>
            </div>
            <div className='grid grid-cols-12'>
                <div className='col-span-3'><AdminSideBar/></div>
                <div className='col-span-9 container mx-auto px-4 py-8'>
                    <div className='tablecontainer'>
                    <button className='float-start w-48 h-11 text-center bg-gray-300 p-3 rounded-lg' onClick={handleGenerateDetails}>Generate Report</button>
                        <div className='flex gap-5 float-end'>                        
                            <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="border border-gray-400 rounded-md px-4 py-2 mb-4 w-72  mr-5 "
                        />
                        </div>
                        
                        <div className="mr-4">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">DeliveryID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Method</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDataList.length > 0 ? (
                                    filteredDataList.map((el) => (
                                        <tr key={el._id}>
                                            <td className="border px-4 py-2">{el._id}</td>
                                            <td className="border px-4 py-2">{el.name}</td>
                                            <td className="border px-4 py-2">{el.method}</td>
                                            <td className="border px-4 py-2">{el.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="border px-4 py-2 text-center">No Data</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                        
                    </div>
                </div>
            </div>

                    </>
    );
}

export default DAdm;
