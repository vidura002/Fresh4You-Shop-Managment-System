import { useState } from "react";
import { useSuppliersContext } from "../hooks/useSuppliersContext";

const SupplierForm = () => {
  const { dispatch } = useSuppliersContext()

  const [name, setName] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [fruit_type, setFruit_type] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplier = { name, contact_number, fruit_type };

    const response = await fetch("/api/suppliers", {
      method: "POST",
      body: JSON.stringify(supplier),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName("");
      setContact_number("");
      setFruit_type("");
      setError(null);
      setEmptyFields([])
      console.log("new supplier added", json);
      dispatch({type: 'CREATE_SUPPLIER', payload: json})
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Supplier</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Contact Number:</label>
      <input
        type="number"
        onChange={(e) => setContact_number(e.target.value)}
        value={contact_number}
        className={emptyFields.includes('contact_number') ? 'error' : ''}
      />

      <label>Fruit Type:</label>
      <input
        type="text"
        onChange={(e) => setFruit_type(e.target.value)}
        value={fruit_type}
        className={emptyFields.includes('fruit_type') ? 'error' : ''}
      />

      <button>Add Supplier</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SupplierForm;
