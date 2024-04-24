import { useEffect, useState } from "react";
import { useSuppliersContext } from "../hooks/useSuppliersContext";
import axios from "axios";

//components
import Supplier_Details from "../components/Supplier_Details";
import SupplierForm from "../components/SupplierForm";
import { useNavigate } from "react-router-dom";

const SupplierDetails = () => {
  //const { suppliers, dispatch } = useSuppliersContext();

  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    usertype: "all",
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [suppliers, setSupliers] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({ searchTerm, sort, order });

    const fetchSupplier = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`http://localhost:3000/api/Suppliers/search/get?${searchQuery}`);
      const data = await res.json();
      setSupliers(data);
      setLoading(false);
    };
    fetchSupplier();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParame = new URLSearchParams();
    urlParame.set("searchTerm", searchData.searchTerm);
    const searchQuery = urlParame.toString();
    navigate(`/supplier_details?${searchQuery}`);
  };

  /*useEffect(() => {
    axios
      .get("http://localhost:3000/api/Suppliers/")
      .then((result) =>
        dispatch({ type: "SET_SUPPLIERS", payload: result.data.data })
      )
      .catch((err) => console.log(err));
  }, []);*/

  return (
    <div className="min-h-screen bg-cover bg-center" style={{backgroundImage: "url(src/pages/assest/orange.jpg)"}}>
    <div className="supplier_details">
        <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            id="searchTerm"
          />
           <button
            onClick={handleSubmit}
            className="bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16"
          >
            Search
          </button>
      <div className="suppliers">
        {suppliers &&
          suppliers.map((supplier) => (
            <Supplier_Details key={supplier._id} supplier={supplier} />
          ))}
      </div>
      <SupplierForm />
    </div>
    </div>
  );
};

export default SupplierDetails;
