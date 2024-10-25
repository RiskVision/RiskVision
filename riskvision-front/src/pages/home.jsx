// Home.js
import React from 'react';
import BurgerMenu from './BurgerMenu'; // Import the BurgerMenu component
import Logo from '../logo-white.png';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    const handleRedirect = (url) =>{
        navigate(url)
    }
  return (
    <div className="h-screen bg-gray-100 relative bg-homebg bg-cover">
      <BurgerMenu /> {/* Use the BurgerMenu component */}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <button className="w-60 h-60 bg-201E43 rounded-full flex items-center justify-center">
          <img src={Logo} alt="logo" className="max-w-full max-h-full p-10" />
        </button>

        {/* Action Buttons 60px below the Circle Button, Side by Side */}
        <div className="flex justify-center space-x-4 mt-16">
          <button className="px-6 py-2 bg-508C9B text-white rounded-md">
            Ver Informe
          </button>
          <button onClick={() =>{handleRedirect('/activos-digitales')}} className="px-6 py-2 bg-508C9B text-white rounded-md">
            Ver Activos Digitales
          </button>
          <button onClick={() =>{handleRedirect('/reporte')}} className="px-6 py-2 bg-508C9B text-white rounded-md">
            Reporte
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
