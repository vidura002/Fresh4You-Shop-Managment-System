import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}
