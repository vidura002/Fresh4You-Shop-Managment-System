import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Signout from './pages/Signout'
import About from './pages/About'
import Profile from './pages/Profile'
import Login from './pages/Login'


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/'  element= {<Home />} ></Route>
        <Route path='/'  element= {<Login />}></Route>
        <Route path='/'  element= {<Signout />}></Route>
        <Route path='/'  element= {<About />}></Route>
        <Route path='/'  element= {<Profile />}></Route>
    </Routes>
    </BrowserRouter>
  )
}


