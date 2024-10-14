import React, { useState, useContext } from 'react';
import '../App2.css';  // Importa el archivo CSS
import { useNavigate } from 'react-router-dom'; // Importa el contexto
import axios from 'axios';

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const navigate = useNavigate();
  const agregarUsuario = async (user) =>{
    try{
      console.log(user)
      const body = {
        user: user.correo,
        password: user.contrasena,
        role: "default"
      }
      console.log(body)
      const response = await axios.post("https://riskvision-backend.onrender.com/login/register", body)
      if(response.data.message == "User added successfully"){
        alert(response.data.message)
      }
    }catch(error){
      alert(error)
      console.log(error)
    }
  } // Accede a agregarUsuario desde el contexto

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarUsuario({ correo, contrasena }); // Agrega el nuevo usuario // Redirige a la lista de usuarios
  };

  return (
    <div className='div'>
      <h1 className='h1'>Crear Usuario</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='div'>
          <label className='label'>Nombre</label>
          <input
            className='input'
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className='div'>
          <label className='label'>Correo</label>
          <input
            className='input'
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className='div'>
          <label className='label'>Contraseña</label>
          <input
            className='input'
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <div className='div'>
          <input className='input' type="checkbox" /> Permiso 1
          <input className='input' type="checkbox" /> Permiso 2
          <input className='input' type="checkbox" /> Permiso 3
        </div>
        <button type="submit" className="submit-button">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CrearUsuario;
