import './App.css';
import Login from './pages/login';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/home'
import AdminHome from './pages/adminHome'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin-home' element={<AdminHome />} />
        <Route path='/home' element={<Home />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
