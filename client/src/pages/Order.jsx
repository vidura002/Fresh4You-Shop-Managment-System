import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function getStatusColor(status) {
  switch (status) {
    case "Paid":
    case "Delivered":
      return "text-green-900 bg-green-500/20";
    case "Canceled":
    case "Unpaid":
      return "text-red-900 bg-red-500/20";
    case "Preparing":
      return "text-blue-900 bg-blue-500/20";
    default:
      return "";
  }
}

const Order = () => {
  //const [orders, setOrders] = useState(null);
  /*useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:3000/api/orders");
      const json = await response.json();

      if (response.ok) {
        console.log("orders", json);
        setOrders(json);
      }
    };
    fetchOrders();
  }, []);*/
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({ searchTerm, type, sort, order });

    const fetchPkg = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `http://localhost:3000/api/orders/search/get?${searchQuery}`
      );

      const data = await res.json();
      console.log("Fetched data:", data);
      setOrders(data);
      setLoading(false);
    };
    fetchPkg();
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
    navigate(`/orders?${searchQuery}`);
  };

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 sm:px-8 items-center">
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-green-400">
            <img
              width="56"
              height="56"
              src="https://img.icons8.com/pastel-glyph/64/FFFFFF/box--v3.png"
              alt="box--v3"
            />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Orders</h3>
            <p className="text-3xl">{orders?.length}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
            <img
              width="56"
              height="56"
              src="https://img.icons8.com/ios-glyphs/60/FFFFFF/money--v1.png"
              alt="money--v1"
            />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Value</h3>
            <p className="text-3xl">
              Rs.
              {orders?.reduce((acc, order) => acc + parseInt(order.total), 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="Order">
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
        <h2>ORDERS</h2>
        <div className="overflow-hidden">
          <table className="font-inter w-full table-auto border-separate border-spacing-y-1 overflow-scroll text-left md:overflow-auto">
            <thead className="w-full rounded-lg bg-[#222E3A]/[6%] text-base font-semibold text-white">
              <tr className="">
                <th className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36]">
                  Order ID
                </th>
                <th className="whitespace-nowrap py-3 pl-1 text-sm font-normal text-[#212B36]">
                  Products
                </th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">
                  Order Date
                </th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">
                  Address
                </th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">
                  Status
                </th>
                <th className="whitespace-nowrap py-3 text-sm font-normal text-[#212B36]">
                  Total Price
                </th>
                <th className="whitespace-nowrap rounded-r-lg py-3 pl-1 text-sm font-normal text-[#212B36]">
                  Customer
                </th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr
                  key={index}
                  className="cursor-pointer bg-[#f6f8fa] drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl"
                >
                  <td className="rounded-l-lg py-4 pl-3 text-sm font-normal text-[#637381]">
                    {order._id}
                  </td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                    {order.items.map((item) => item.name).join(", ")}
                  </td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                    {order.createdAt.split("T")[0]}
                  </td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                    {order.address}
                  </td>
                  <td className="px-1 py-4">
                    <div className="w-max">
                      <div
                        className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <span>{order.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-1 py-4 text-sm font-normal text-[#637381]">
                    Rs.{order.total.toFixed(2)}
                  </td>
                  <td className="rounded-r-[8px] px-1 py-4 text-sm font-normal text-[#637381]">
                    <div className="relative flex items-center gap-1">
                      {order.user}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Order;
