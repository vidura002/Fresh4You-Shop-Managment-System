const OrderDetails = ({ order }) => {
  return (
    <div className="order-details">
      <p>
        <strong>Order ID : </strong>
        {order._id}
      </p>
      <p>
        <strong>Customer ID : </strong>
        {order.CustomerID}
      </p>
      <p>
        <strong>Fruit Details : </strong>
        {order.Items}
      </p>
      <p>
        <strong>Shopping Address : </strong>
        {order.Address}
      </p>
      <p>
        <strong>Total Price : </strong>
        {order.Price}
      </p>
      <p>
        <strong>Paid Date & Time : </strong>
        {order.createdAt}
      </p>
    </div>
  );
};

export default OrderDetails;
