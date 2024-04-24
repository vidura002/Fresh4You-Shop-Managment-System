import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import SupplierDetails from "./pages/SupplierDetails";
import SupplierOrders from "./SupplierOrders";
import CreateOrder from "./CreateOrder";
import UpdateOrder from "./UpdateOrder";
import SupplierOrderDetails from "./SupplierOrderDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import DeliveryPlaces from "./pages/DeliveryPlaces";
import AddStock from "./pages/AddStock";
import AdminStock from "./pages/AdminStock";
import Order from "./pages/Order";
import ShoppingCart from "./pages/ShoppingCart";
import CartProducts from "./components/CartProducts";
import OrderPayment from "./pages/OrderPayment";
import FruitCatelog from "./pages/FruitCatelog";
import UpdateStock from "./pages/UpdateStock";
import UserOrders from "./pages/UserOrders";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/supplier_details" element={<SupplierDetails />}></Route>
        <Route path="/supplier_orders" element={<SupplierOrders />}></Route>
        <Route path="/create" element={<CreateOrder />}></Route>
        <Route path="/update/:id" element={<UpdateOrder />}></Route>
        <Route
          path="/supplier_order_details"
          element={<SupplierOrderDetails />}
        ></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
        </Route>

        {/* Orders */}
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
        <Route path="/cartproducts" element={<CartProducts />}></Route>
        <Route path="/productSlice" element={<productSlice />}></Route>
        <Route path="/user-orders" element={<UserOrders />}></Route>

        {/*Order payment  */}
        <Route path="/orderpayment" element={<OrderPayment />}></Route>

        <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/DeliveryPlaces" element={<DeliveryPlaces />}></Route>

        <Route path="/AdminStock" element={<AdminStock />}></Route>
        <Route path="/AddStock" element={<AddStock />}></Route>
        <Route path="/FruitCatelog" element={<FruitCatelog />}></Route>
        <Route path="/UpdateStock" element={<UpdateStock />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
