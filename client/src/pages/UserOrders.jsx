import { useEffect, useState } from "react";

//components
import OrderDetails from "../components/OrderDetails";
const UserOrders = () => {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders/user/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        setOrders(json);
      }
    };
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setOrders(orders.filter((order) => order._id !== orderId));
    } else {
      console.error("Failed to cancel the order");
    }
  };

  const changeAddress = (orderId, newAddress) => {
    setOrders(
      orders.map((order) =>
        order._id === orderId ? { ...order, address: newAddress } : order
      )
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="Order">
        <h2>MY ORDERS</h2>
        {orders &&
          orders.map((order, index) => (
            <div className="order-details" key={index}>
              <p>
                <strong>Order ID : </strong>
                {order._id}
              </p>
              <p>
                <strong>Fruit Details : </strong>
                {order.items.map((m) => `${m.name}(${m.qty})`).join(", ")}
              </p>
              <p>
                <strong>Shopping Address : </strong>
                {order.address}
              </p>
              <p>
                <strong>Total Price : </strong>
                Rs.{order.total.toFixed(2)}
              </p>
              <p>
                <strong>Paid Date & Time : </strong>
                {order.createdAt}
              </p>
              <button
                onClick={() =>
                  changeAddress(order._id, prompt("Enter new address:"))
                }
              >
                Change Address
              </button>
              <button onClick={() => cancelOrder(order._id)}>
                Cancel Order
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default UserOrders;
