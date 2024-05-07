import CreateOffer from "./pages/CreateOffer";
import AdminOffer from "./pages/AdminOffer";
import OfferNotification from "./pages/OfferNotification";
import UpdateOffer from "./pages/UpdateOffer";
import OfferCatalog from "./pages/OfferCatalog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import AdminDashboard from "./pages/AdminDashboard";
import DeliveryPlaces from "./pages/DeliveryPlaces";
import AddStock from "./pages/AddStock";
import AdminStock from "./pages/AdminStock";

import "bootstrap/dist/css/bootstrap.min.css";
import SupplierDetails from "./pages/SupplierDetails";
import SupplierOrders from "./SupplierOrders";
import CreateOrder from "./CreateOrder";
import UpdateOrder from "./UpdateOrder";
import SupplierOrderDetails from "./SupplierOrderDetails";
import Order from "./pages/Order";
import ShoppingCart from "./pages/ShoppingCart";
import CartProducts from "./components/CartProducts";
import OrderPayment from "./pages/OrderPayment";
import FruitCatelog from "./pages/FruitCatelog";

import { SupplierDashboard } from './pages/SupplierDashboard';
import UserList from './pages/UserList';

import UpdateStock from "./pages/UpdateStock";
import UserOrders from "./pages/UserOrders";
import OrderReceipt from "./pages/OrderReceipt";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/supplier_details" element={<SupplierDetails />}></Route>
        <Route path="/supplier_orders" element={<SupplierOrders />}></Route>
        <Route path="/create" element={<CreateOrder />}></Route>
        <Route path="/update/:id" element={<UpdateOrder />}></Route>
        <Route path="/userslist" element={<UserList />}></Route>
        <Route
          path="/supplier_order_details"
          element={<SupplierOrderDetails />}
        ></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
        </Route>
        <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/DeliveryPlaces" element={<DeliveryPlaces />}></Route>
        <Route path="/AdminOffer" element={<AdminOffer />}></Route>
        <Route path="/CreateOffer" element={<CreateOffer/>}></Route>
        <Route path="/OfferNotification" element={<OfferNotification/>}></Route>
        <Route path="/UpdateOffer/:_id" element={<UpdateOffer/>}></Route>
        <Route path="/OfferCatalog" element={<OfferCatalog/>}></Route>
        <Route path="/SupplierDashboard" element={<SupplierDashboard/>}></Route>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
        <Route path="/DeliveryPlaces" element={<DeliveryPlaces/>}></Route>
        <Route path="/AdminStock" element={<AdminStock/>}></Route>
        <Route path="/AddStock" element={<AddStock/>}></Route>
        <Route path="/FruitCatelog" element={<FruitCatelog/>}></Route>
        <Route path="/UpdateStock/:_id" element={<UpdateStock/>}></Route>
        <Route path="/UpdateStock" element={<UpdateStock/>}></Route>
        <Route path="/usersList" element={<UserList/>}></Route>


        {/* Orders */}
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
        <Route path="/cartproducts" element={<CartProducts />}></Route>
        <Route path="/productSlice" element={<productSlice />}></Route>
        <Route path="/user-orders" element={<UserOrders />}></Route>

        {/*Order payment  */}
        <Route path="/orderpayment" element={<OrderPayment />}></Route>
        <Route path="/orderReceipt" element={<OrderReceipt />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
