import { useEffect, useState } from "react";

//components
import OrderDetails from "../components/OrderDetails";
const Order = () => {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:3000/api/orders");
      const json = await response.json();

      if (response.ok) {
        console.log("orders", json);
        setOrders(json);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="Order">
      <h2>ORDERS</h2>
      {orders &&
        orders.map((order) => <OrderDetails key={order._id} order={order} />)}
    </div>
  );
};
export default Order;
