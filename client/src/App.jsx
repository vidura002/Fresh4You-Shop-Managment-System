import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import AdminOffer from './pages/AdminOffer';
import AddOffer from './pages/AddOffer';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/create-listing" element={<CreateListing />}></Route>
          </Route>
          <Route path="/adminOffer" element={<AdminOffer/>}></Route>
        <Route path="/AddOffer" element={<AddOffer/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
