import React, { useState } from "react";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, product: "Product 1", address: "Address 1" },
    { id: 2, product: "Product 2", address: "Address 2" },
    { id: 3, product: "Product 3", address: "Address 3" },
  ]);

  const cancelOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const changeAddress = (orderId, newAddress) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, address: newAddress } : order
      )
    );
  };

  return (
    <div>
      <h2>MY ORDERS</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Product:</strong> {order.product} |
            <strong> Address:</strong> {order.address} |
            <button onClick={() => cancelOrder(order.id)}>Cancel Order</button>
            <button
              onClick={() =>
                changeAddress(order.id, prompt("Enter new address:"))
              }
            >
              Change Address
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerOrders;
