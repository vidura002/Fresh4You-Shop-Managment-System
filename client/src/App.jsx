import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Route path="/supplier_order_details" element={<SupplierOrderDetails />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
