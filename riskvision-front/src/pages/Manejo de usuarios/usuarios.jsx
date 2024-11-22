import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App2.css';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from '../../User-Profile.png'; // Importa la imagen de perfil
import BurgerMenu from '../../components/Menu/BurgerMenu';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8000/login',{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsuarios(response.data.users);
      } catch (err) {
        setError('Error al obtener usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Función para manejar el clic en una tarjeta de usuario
  const handleUserClick = (usuario) => {
    navigate(`/editar-usuario`, { state: { usuario } }); // Redirige pasando datos del usuario
  };

  return (
    <div>
      <BurgerMenu />
      <h1 className='h1 text-black'>Usuarios</h1>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <div className="mt-4 text-center">
          <div className="spinner"></div>
          <p>Cargando, por favor espera...</p>
        </div>
      ) : (
        <div className="usuarios-container">
          {usuarios.map((usuario) => (
            <div 
              key={usuario.user}
              className="usuario-card"
              onClick={() => handleUserClick(usuario)} // Pasar los datos del usuario al componente de edición
            >
              <img src={UserProfile} alt="Perfil de usuario" />
              <h3>{usuario.name}</h3>
              <p>{usuario.role}</p>
            </div>
          ))}
        </div>
      )}
      <Link to='/crear-usuario'>
        <button className="create-button-round">
          <span className="plus-icon">+</span>
        </button>
      </Link>
    </div>
  );
};

export default Usuarios;
