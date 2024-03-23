import React from 'react'
import Header from '../components/Header';

function DeliveryPlaces() {
    const addresses = [
        { city: "Arangala", postalCode: "10118" },
        { city: "Athurugiriya", postalCode: "10150" },
        { city: "Bandarawatta", postalCode: "11410" },
        { city: "Battaramulla", postalCode: "10120" },
        { city: "Boralesgamuwa", postalCode: "10290" },
        { city: "Colombo 02", postalCode: "00200" },
        { city: "Colombo 03", postalCode: "00300" },
        { city: "Colombo 04", postalCode: "00400" },
        { city: "Colombo 05", postalCode: "00500" },
        { city: "Colombo 06", postalCode: "00600" },
        { city: "Colombo 07", postalCode: "00700" },
        { city: "Colombo 08", postalCode: "00800" },
        { city: "Colombo 09", postalCode: "00900" },
        { city: "Colombo 10", postalCode: "01000" },
        { city: "Dandugama", postalCode: "11410" },
        { city: "Dehiwala", postalCode:"10350" },
        { city: "Ethul Kotte", postalCode: "10100" },
        { city: "Gonawala", postalCode: "11630" },
        { city: "Gampaha", postalCode: "11000" },
        { city: "Hokandara", postalCode: "10118" },
        { city: "Kadawatha", postalCode: "11850" },
        { city: "Kaduwela", postalCode: "10640" },
        { city: "Kalubowila", postalCode: "10350" },
        { city: "Katunayaka", postalCode: "11450" },
        { city: "Kelaniya", postalCode: "11600" },
        { city: "Kimbulapitiya", postalCode: "11522" },
        { city: "Kiribathgoda", postalCode: "11600" },
        { city: "Kohuwala", postalCode: "10350" },
        { city: "Kotugoda", postalCode: "11390" },
        { city: "Liyanagemulla", postalCode: "11410" },
        { city: "Maharagama", postalCode: "10280" },
        { city: "Makola", postalCode: "11640" },
        { city: "Malabe", postalCode: "10115" },
        { city: "Mukalangamuwa", postalCode: "11410" },
        { city: "Negombo", postalCode: "11500" },
        { city: "Nugegoda", postalCode: "10250" },
        { city: "Pannipitiya", postalCode: "10230" },
        { city: "Peliyagoda", postalCode: "11830" },
      ];
    
      return (
        <div>
            <Header/><br />
            <h2 className="text-4xl font-semibold mb-4 text-center">Where We Deliver</h2><br />
            <table className="min-w-96	divide-x divide-y divide-gray-200 mx-auto">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Postal Code</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-x divide-gray-200">
                {addresses.map((address, index) => (
                    <tr key={index}>
                    <td className="px-5 py-4 whitespace-nowrap">{address.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{address.postalCode}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
      );
    
}

export default DeliveryPlaces