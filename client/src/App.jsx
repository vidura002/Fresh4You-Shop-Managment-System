import { BrowserRouter , Routes , Route} from 'react-router-dom';
import React from 'react';
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
import CreateFeedback from './pages/CreateFeedback';
import Feedback from './pages/Feedback';


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/'  element= {<Home />} ></Route>
        <Route path='/signup'  element= {<Register />}></Route>
        <Route path='/signin'  element= {<Signin />}></Route>
        <Route path='/about'  element= {<About />}></Route>
        <Route element= {<PrivateRoute /> }>
          <Route path='/profile'  element= {<Profile />}></Route>
          <Route path='/create-listing'  element= {<CreateListing />}></Route>
        </Route>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
        <Route path="/DeliveryPlaces" element={<DeliveryPlaces/>}></Route>
        <Route path="/CreateFeedback"  element= {<CreateFeedback />}></Route>
        <Route path="/Feedback"  element= {<Feedback />}></Route>
    </Routes>
    
    </BrowserRouter>

    

    
  );
};