const OrderDetails = ({ order }) => {
  return (
    <div className="order-details">
      <p>
        <strong>Order ID : </strong>
        {order._id}
      </p>
      <p>
        <strong>Customer ID : </strong>
        {order.user}
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
    </div>
  );
};

export default OrderDetails;
