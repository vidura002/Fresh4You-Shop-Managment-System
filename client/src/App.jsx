;
import CreateOffer from "./pages/CreateOffer";
import AdminOffer from "./pages/AdminOffer";
import OfferNotification from "./pages/OfferNotification";
import UpdateOffer from "./pages/UpdateOffer";
import OfferCatalog from "./pages/OfferCatalog";
import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header'
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import AdminDashboard from './pages/AdminDashboard';
import DeliveryPlaces from './pages/DeliveryPlaces';
import AddStock from './pages/AddStock';
import AdminStock from './pages/AdminStock';
import FruitCatelog from "./pages/FruitCatelog";
import UpdateStock from "./pages/UpdateStock"

export default function App() {
  return (
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

        <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/DeliveryPlaces" element={<DeliveryPlaces />}></Route>
        <Route path="/AdminOffer" element={<AdminOffer />}></Route>
        <Route path="/CreateOffer" element={<CreateOffer/>}></Route>
        <Route path="/OfferNotification" element={<OfferNotification/>}></Route>
        <Route path="/UpdateOffer" element={<UpdateOffer/>}></Route>
        <Route path="/OfferCatalog" element={<OfferCatalog/>}></Route>
        <Route path="/AdminStock" element={<AdminStock/>}></Route>
        <Route path="/AddStock" element={<AddStock/>}></Route>
        <Route path="/FruitCatelog" element={<FruitCatelog/>}></Route>
        <Route path="/UpdateStock" element={<UpdateStock/>}></Route>
      </Routes>
    
    </BrowserRouter>
  );
}
