import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa axios
import '../App2.css';  // Importa el archivo CSS
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from '../User-Profile.png'; // Importa la imagen de perfil
import BurgerMenu from './BurgerMenu';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Estado local para los usuarios
  const [loading, setLoading] = useState(true); // Estado para controlar el loading
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los usuarios de la API
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://riskvision-backend.onrender.com/login'); // Cambia la URL por tu endpoint
        setUsuarios(response.data.users); // Actualiza el estado con los usuarios obtenidos
      } catch (err) {
        setError('Error al obtener usuarios'); // Maneja el error
      } finally {
        setLoading(false); // Detiene el estado de carga
      }
    };

    fetchUsuarios(); // Llama a la función cuando el componente se monta
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  return (
    <div>
      <BurgerMenu />
      <h1 className='h1'>Usuarios</h1>

      {/* Muestra el error si hay algún problema */}
      {error && <p className="error">{error}</p>}

      {/* Muestra el loader mientras se cargan los datos */}
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="usuarios-container">
          {usuarios.map((usuario, index) => (
            <div key={index} className="usuario-card">
              <img src={UserProfile} alt="Perfil de usuario" />
              <h3>{usuario.name}</h3>
              <p>{usuario.role}</p>
            </div>
          ))}
        </div>
      )}
      <Link to='/crear-usuario'>
        <button className="create-button">
          <p>Crear Usuario</p>
        </button>
      </Link>
    </div>
  );
};

export default Usuarios;
