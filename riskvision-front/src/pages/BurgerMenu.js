// BurgerMenu.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null); // State to store the user's role
  const navigate = useNavigate();

  // Fetch the role from localStorage when the component mounts
  React.useEffect(() => {
    const userRole = localStorage.getItem('role');

    if (!userRole) {
      // If no role is found, redirect to the Unauthorized page
      navigate('/unauthorized');
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const redirect = (where) => {
    navigate(where);
    closeMenu(); // Close the menu after redirecting
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear the entire localStorage (including token and role)
    navigate('/'); // Redirect to login page
  };

  return (
    <>
      {/* Sliding Burger Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-48 bg-201E43 text-white transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4">
          <span>Menú</span>
          <button
            className="text-2xl text-white focus:outline-none"
            onClick={closeMenu}
          >
            ✕
          </button>
        </div>

        {/* Conditionally Render Menu Items Based on Role */}
        {role === 'admin' ? (
          <>
            <a onClick={() => redirect('/home')} className="block px-4 py-2 hover:bg-gray-600">
              Pagina Principal
            </a>
            <a onClick={() => redirect('/reportes-pasados')} className="block px-4 py-2 hover:bg-gray-600">
              Reportes
            </a>
            <a onClick={() => redirect('/documentos-referencia')} className="block px-4 py-2 hover:bg-gray-600">
              Documentos
            </a>
            <a onClick={() => redirect('/activos-digitales')} className="block px-4 py-2 hover:bg-gray-600">
              Activos Digitales
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Últimos CVEs
            </a>
            <a onClick={() => redirect('/usuarios')} className="block px-4 py-2 hover:bg-gray-600">
              Gestión de usuarios
            </a>
          </>
        ) : (
          <>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Reportes
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Documentos
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Activos Digitales
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-600">
              Últimos CVEs
            </a>
          </>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 mt-4"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Burger Icon in a Gray Circle */}
      <div className="absolute top-4 left-4">
        <button
          className="w-12 h-12 flex items-center justify-center bg-201E43 rounded-full text-3xl text-white focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>
    </>
  );
}

export default BurgerMenu;
