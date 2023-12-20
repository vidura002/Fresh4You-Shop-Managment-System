import { BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header'
import Register from './pages/Register';



export default function App() {
  return (
    <BrowserRouter>
  <Header />
    <Routes>
        <Route path='/'  element= {<Home />} ></Route>
        <Route path='/signup'  element= {<Register />}></Route>
        <Route path='/signin'  element= {<Signin />}></Route>
        <Route path='/about'  element= {<About />}></Route>
        <Route path='/profile'  element= {<Profile />}></Route>
    </Routes>
    </BrowserRouter>
  );
}


