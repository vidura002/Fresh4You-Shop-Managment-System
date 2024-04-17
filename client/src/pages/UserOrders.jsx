import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

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
    try {
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
    } catch (error) {
      console.error("Failed to cancel the order:", error);
    }
  };

  const changeAddress = async (orderId, newAddress) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: newAddress }),
      });

      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, address: newAddress } : order
          )
        );
      } else {
        console.error("Failed to change address");
      }
    } catch (error) {
      console.error("Failed to change address:", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="Order bg-white">
        <h2>MY ORDERS</h2>
        <div className="px-4">
          <div className="mx-auto w-full max-w5xl rounded-2xl">
            {orders &&
              orders.map((order, index) => (
                <Disclosure key={index} as="div" className="mt-2">
                  {() => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-200 px-4 py-2 text-left text-md font-medium text-black hover:bg-green-100 focus:outline-none focus-visible:ring focus-visible:ring-green-500/75">
                        <div className="flex">
                          <div className="flex flex-col">
                            <span className="whitespace-nowrap font-bold">
                              {order.status == "Paid" ? "Payment Accepted" : ""}
                            </span>
                            <span className="whitespace-nowrap">
                              Rs.{order.total.toFixed(2)}
                            </span>
                            <span className="whitespace-nowrap">
                              Shipping Address: {order.address}
                            </span>
                          </div>
                        </div>
                        <div className="flex w-full justify-end text-xs">
                          <div className="flex flex-col items-end">
                            <span>
                              Order Date: {order.createdAt.split("T")[0]}
                            </span>
                            <span>Order ID: {order._id}</span>
                          </div>
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 text-sm bg-green-100 text-gray-500">
                        <div className="flex gap-3 pt-2">
                          {order.items.map((item, index) => (
                            <div key={index}>
                              <img
                                className=" w-16 m-auto border-green-400 border-2"
                                src={item.image}
                              ></img>
                              <span>{`${item.name} (${item.qty})`}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end gap-2 text-white pb-3">
                          <button
                            className="btn bg-green-700 rounded-xl py-1 px-2"
                            onClick={() =>
                              changeAddress(
                                order._id,
                                prompt("Enter new address:")
                              )
                            }
                          >
                            Change Address
                          </button>
                          <button
                            className="btn bg-red-500 rounded-xl py-1 px-2 "
                            onClick={() => cancelOrder(order._id)}
                          >
                            Cancel Order
                          </button>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserOrders;
