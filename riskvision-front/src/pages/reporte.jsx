// reporte.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Reporte() {
  const [todos, setTodos] = useState([]); // Cambié a 'todos' para manejar múltiples tareas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/');
        setTodos(response.data); // Guarda la lista de todos
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleBack = () => {
    navigate('/home'); // Cambia '/ruta-deseada' por la ruta a la que quieres volver
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
        >
          Regresar
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de Todos</h1>
        {todos.map((todo) => (
          <div key={todo.id} className="mb-4 p-4 border rounded-md shadow">
            <p className="mb-2"><span className="font-semibold">ID:</span> {todo.id}</p>
            <p className="mb-2"><span className="font-semibold">Title:</span> {todo.title}</p>
            <p><span className="font-semibold">Completed:</span> {todo.completed ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reporte;
