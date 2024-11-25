import React, { useState } from 'react';
import axios from 'axios';
import rvlogo from '../../components/images/logo-white.png';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Importar la clase CSS

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:8000/login/', { user, password });
      const { token, role, ...rest } = response.data; // Get token, role, and any other properties

      if (token) {
        // Store token and other properties in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userData', JSON.stringify(rest)); // Store the rest of the response as user data

        // Redirect to home if token is present
        navigate("/home");
      } 
    } catch (err) {
      setError('Error en la autenticación');
      alert("Usuario o contraseña incorrecto");
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className='bg-banner'>
      <div className="bg-overlay"></div> {/* Overlay con opacidad */}
      <div className="flex items-center justify-center min-h-screen text-white relative z-10">
        <div className="backdrop-blur-md bg-gray-800/80 p-6 rounded-lg w-96 shadow-lg ring-black/5"> {/* Cambiar el fondo a gris oscuro con opacidad */}
          <div className='flex items-center justify-center mb-4'>
            <img src={rvlogo} alt='logo' width={100}/>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Iniciar Sesión</h2> {/* Cambiar el color del texto a blanco */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white" htmlFor="user">Usuario</label> {/* Cambiar el color del texto a blanco */}
              <input
                type="text"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="mt-1 p-2 w-full border text-black rounded-md"
                required
                disabled={loading} // Disable input while loading
              />
            </div>
            <div className="mb-4">
              <label className="block text-white" htmlFor="password">Contraseña</label> {/* Cambiar el color del texto a blanco */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border text-black rounded-md"
                required
                disabled={loading} // Disable input while loading
              />
            </div>
            <button
              type="submit"
              className={`backdrop-blur-md w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 ${loading ? 'cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'} {/* Show loading text */}
            </button>
          </form>

          {/* Show a loading spinner and message */}
          {loading && (
            <div className="mt-4 text-center">
              <div className="spinner"></div> {/* Spinner */}
              <p>Cargando, por favor espera...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;