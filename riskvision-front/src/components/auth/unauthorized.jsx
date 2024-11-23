import React from 'react';

function Unauthorized() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Acceso no autorizado</h1>
        <p className="text-lg text-gray-700">
          No tienes permiso para acceder a esta página. Por favor, inicia sesión.
        </p>
        <a
          href="/"
          className="mt-4 inline-block px-6 py-2 bg-508C9B text-white rounded-md hover:bg-134B70"
        >
          Volver a la página de inicio
        </a>
      </div>
    </div>
  );
}

export default Unauthorized;
