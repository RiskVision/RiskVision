import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarUsuario = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = location.state; // Obtener los datos del usuario pasado desde la lista

  // Estado para manejar los datos editables del usuario
  const [formData, setFormData] = useState({
    name: usuario.name || '',
    role: usuario.role || '',
    privileges: usuario.privileges || []
  });
  const [error, setError] = useState('');

  // Lista de posibles privilegios
  const availablePrivileges = [
    { id: 'read', label: 'Leer' },
    { id: 'write', label: 'Escribir' },
    { id: 'edit', label: 'Editar' },
    { id: 'delete', label: 'Eliminar' },
  ];

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === "privileges") {
      // Actualizar privilegios
      setFormData((prevState) => {
        const updatedPrivileges = checked
          ? [...prevState.privileges, value] // Agregar si está marcado
          : prevState.privileges.filter((priv) => priv !== value); // Remover si no está marcado

        return { ...prevState, privileges: updatedPrivileges };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/login`, {
        user: usuario.user,
        updates: formData
      }); // Ajusta la URL
      navigate('/usuarios'); // Redirige de vuelta a la lista de usuarios
    } catch (err) {
      setError('Error al actualizar la información del usuario');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del botón
    console.log("Usuario a borrar:", usuario.user); // Verifica que el ID del usuario esté presente
    try {
        await axios.delete(`http://localhost:8000/login`, {
            data: { user: usuario.user } // Asegúrate de usar "data" para enviar el cuerpo
        });
        navigate('/usuarios');
    } catch (err) {
        setError('Error al borrar el usuario');
        console.log(err);
    }
};



  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Editar Usuario</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-lg w-96">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rol:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el rol"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Privilegios:</label>
          <div className="flex flex-col">
            {availablePrivileges.map((privilege) => (
              <label key={privilege.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="privileges"
                  value={privilege.id}
                  checked={formData.privileges.includes(privilege.id)}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-gray-700">{privilege.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Cambios
          </button>
          <button
            onClick={(e)=>{handleDelete(e)}}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Borrar usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarUsuario;
