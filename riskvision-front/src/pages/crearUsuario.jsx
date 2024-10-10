import React, { useState, useContext } from 'react';
import '../App2.css';  // Importa el archivo CSS
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importa el contexto

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const navigate = useNavigate();
  const { agregarUsuario } = useContext(UserContext); // Accede a agregarUsuario desde el contexto

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarUsuario({ nombre, correo }); // Agrega el nuevo usuario
    navigate('/'); // Redirige a la lista de usuarios
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <div>
          <input type="checkbox" /> Permiso 1
          <input type="checkbox" /> Permiso 2
          <input type="checkbox" /> Permiso 3
        </div>
        <button type="submit" className="submit-button">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CrearUsuario;
