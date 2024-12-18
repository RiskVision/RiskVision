import React, { useState } from 'react';
import '../../App2.css';  // Importa el archivo CSS
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const CrearUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [privilegios, setPrivilegios] = useState([]); // Estado para los privilegios seleccionados
  const [rol, setRol] = useState('default'); // Estado para el rol
  
  const navigate = useNavigate();

  // Lista de posibles privilegios
  const availablePrivileges = [
    { id: 'read', label: 'Leer' },
    { id: 'write', label: 'Escribir' },
    { id: 'edit', label: 'Editar' },
    { id: 'delete', label: 'Eliminar' },
  ];

  const agregarUsuario = async (user) => {
    try {
      const body = {
        user: user.correo,
        password: user.contrasena,
        name: user.nombre,  // Agrega el nombre
        role: user.rol,  // Agrega el rol seleccionado
        privileges: user.privilegios // Agrega los privilegios
      };
      const response = await axios.post("http://localhost:8000/login/register", body);
      if (response.data.message === "User added successfully") {
        alert(response.data.message);
        navigate("/usuarios"); // Redirige a la lista de usuarios
      }
    } catch (error) {
      alert("Error al agregar el usuario");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarUsuario({ nombre, correo, contrasena, privilegios, rol }); // Pasa el nombre, privilegios y rol
  };

  const handlePrivilegioChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPrivilegios([...privilegios, value]); // Agrega el privilegio si está seleccionado
    } else {
      setPrivilegios(privilegios.filter((p) => p !== value)); // Lo elimina si se deselecciona
    }
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
          <label className='label'>Rol</label>
          <select
            className='input'
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          >
            <option value="default">Selecciona un rol</option>
            <option value="admin">Administrativo</option>
            <option value="user">TI</option>
          </select>
        </div>
        <div className='div'>
          <label className='label'>Permisos</label>
          <div>
            {availablePrivileges.map((privilege) => (
              <div key={privilege.id}>
                <input 
                  className='input' 
                  type="checkbox" 
                  value={privilege.id} 
                  onChange={handlePrivilegioChange} 
                /> {privilege.label}
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">Crear Usuario</button>
      </form>
    </div>
  );
};

export default CrearUsuario;
