import { useEffect } from "react";
import { useSuppliersContext } from "../hooks/useSuppliersContext";
import axios from "axios";

//components
import Supplier_Details from "../components/Supplier_Details";
import SupplierForm from "../components/SupplierForm";

const SupplierDetails = () => {
  const { suppliers, dispatch } = useSuppliersContext();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/Suppliers/")
      .then((result) =>
        dispatch({ type: "SET_SUPPLIERS", payload: result.data.data })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="supplier_details">
      <div className="suppliers">
        {suppliers &&
          suppliers.map((supplier) => (
            <Supplier_Details key={supplier._id} supplier={supplier} />
          ))}
      </div>
      <SupplierForm />
    </div>
  );
};

export default SupplierDetails;
