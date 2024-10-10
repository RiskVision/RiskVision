import React from 'react';
import './App.css';
import './App2.css';  // Importa el archivo CSS
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Usuarios from './pages/usuarios';
import Login from './pages/login'
import CrearUsuario from './pages/crearUsuario';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
