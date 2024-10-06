import React, { useState } from 'react';
import axios from 'axios';
import rvlogo from '../logo-white.png'

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', { user, password });
      if(response.data.token){
        alert("Success")
      }
    } catch (err) {
      setError('Error en la autenticación');
      
    }
  };

  return (
    <div className='bg-banner bg-cover'>
    
    <div className=" flex items-center justify-center min-h-screen text-white" >
      <div className="backdrop-blur-md bg-white/0 p-6 rounded-lg w-96 shadow-lg  ring-black/5">
        <div className='flex items-center'>
            <img src={rvlogo} alt='logo' width={100}/>
            <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block" htmlFor="user">Usuario</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="mt-1 p-2 w-full border text-black rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border text-black rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="backdrop-blur-md w-full bg-508C9B text-white py-2 rounded-md hover:bg-134B70"
            style={{color: 'white'}}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
