import React, { useContext } from 'react';
import '../App2.css';  // Importa el archivo CSS
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importa el contexto
import UserProfile from '../User-Profile.png'; // Importa la imagen de perfil

const Usuarios = () => {
  const { usuarios } = useContext(UserContext); // Accede a los usuarios desde el contexto

  return (
    <div>
      <h1>Usuarios</h1>
      <div className="usuarios-container">
        {usuarios.map((usuario, index) => (
          <div key={index} className="usuario-card">
            <img src={UserProfile} alt="Perfil de usuario" />
            <h3>{usuario.nombre}</h3>
            <p>{usuario.correo}</p>
          </div>
        ))}
      </div>
      <button className="create-button">
        <Link to="/crear-usuario">Crear Usuario</Link>
      </button>
    </div>
  );
};

export default Usuarios;
