import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Order from "./pages/Order";
import ShoppingCart from "./pages/ShoppingCart";
import CartProducts from "./components/CartProducts";
import productSlice from "./redux/productSlice";
import OrderPayment from "./pages/OrderPayment";
import { ShopTest } from "./pages/ShopTest";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
        </Route>

        {/* Orders */}
        <Route path="/orders" element={<Order />}></Route>
        <Route path="/shoppingcart" element={<ShoppingCart />}></Route>
        <Route path="/cartproducts" element={<CartProducts />}></Route>
        <Route path="/productSlice" element={<productSlice />}></Route>

        {/*Order payment  */}
        <Route path="/orderpayment" element={<OrderPayment />}></Route>
        <Route path="/shop" element={<ShopTest />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
