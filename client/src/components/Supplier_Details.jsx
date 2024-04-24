import { useSuppliersContext } from "../hooks/useSuppliersContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Supplier_Details = ({ supplier }) => {
  const { dispatch } = useSuppliersContext();

  const handleClick = async () => {
    const response = await fetch("/api/suppliers/" + supplier._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_SUPPLIER", payload: json });
    }
  };

  return (
    <div className="supplier-details">
      <h4>{supplier.name}</h4>
      <p>
        <strong>Contact Number: </strong>
        {supplier.contact_number}
      </p>
      <p>
        <strong>Fruit Type: </strong>
        {supplier.fruit_type}
      </p>
      <p>
        {formatDistanceToNow(new Date(supplier.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default Supplier_Details;
