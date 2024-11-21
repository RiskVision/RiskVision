import React, { useState } from 'react';
import BurgerMenu from '../../components/menu/burgerMenu'; // Import the BurgerMenu component
import Logo from '../../components/images/logo-white.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(''); // State to hold the input value
  const [response, setResponse] = useState(''); // State to hold the response from the server

  const handleRedirect = (url) => {
    navigate(url);
  };

  // Axios request to handle the prompt submission
  const handlePromptSubmit = async () => {
    try {
      const res = await axios.post('/your-endpoint', { prompt: inputValue });
      setResponse(res.data); // Update state with the server's response
    } catch (error) {
      console.error('There was an error processing the prompt:', error);
      setResponse('Error: Could not process your request.');
    }
  };

  // Nueva función vacía para una futura llamada
  const handleAIResponse = async () => {
    try {
      // Send the inputValue as a query parameter instead of in the body
      const res = await axios.get('http://localhost:8000/reports/getReport', {
        params: { prompt: inputValue }
      });
    
      if (res.status === 200) {
        const markdown = res.data.data.content;  // Access the content properly
    
        console.log(markdown);  // Log to verify the content
    
        // Store the Markdown content in localStorage
        localStorage.setItem("markdownContent", markdown);
    
        // Redirect to the /resultados route
        handleRedirect('/resultados');
      }
    
    }catch(error){
      console.error('Error al procesar la respuesta del AI:',error)
    }
    console.log('Esta función realizará una llamada en el futuro');
  };

  return (
    <div className="h-screen bg-gray-100 relative bg-homebg bg-cover">
      <BurgerMenu /> {/* Use the BurgerMenu component */}

      {/* KPI Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-screen-lg mx-auto my-4">
        <h2 className="text-2xl font-semibold mb-4">KPI Dashboard</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {/* Example KPI 1 */}
          <div className="bg-gray-200 p-4 rounded-md">
            <h3 className="text-lg font-medium">Vulnerabilidades de interés</h3>
            {/*<p className="text-2xl font-bold">1,234</p>*/}
            <div className="mt-4 text-center">
              <div className="spinner"></div> {/* Spinner */}
              <p>Cargando</p>
            </div>
          </div>
          {/* Example KPI 2 */}
          <div className="bg-gray-200 p-4 rounded-md">
            <h3 className="text-lg font-medium">Recomendaciones</h3>
            {/*<p className="text-2xl font-bold">567</p>*/}
            <div className="mt-4 text-center">
              <div className="spinner"></div> {/* Spinner */}
              <p>Cargando</p>
            </div>
          </div>
          {/* Example KPI 3 */}
          <div className="bg-gray-200 p-4 rounded-md">
            <h3 className="text-lg font-medium">Activos vulnerables</h3>
            {/*<p className="text-2xl font-bold">12.5%</p>*/}
            <div className="mt-4 text-center">
              <div className="spinner"></div> {/* Spinner */}
              <p>Cargando</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <button onClick={() => {handleAIResponse()}} className="w-60 h-60 bg-201E43 rounded-full flex items-center justify-center">
          <img src={Logo} alt="logo" className="max-w-full max-h-full p-10" />
        </button>

        {/* Text input field below the big button */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update the state with input value
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handlePromptSubmit(); // Submit the prompt on Enter key press
            }
          }}
          placeholder="Enter your message..."
          className="mt-6 px-4 py-2 border rounded-md w-80"
        />

        {/* Display the response below the input field */}
        {response && (
          <div className="mt-4 p-4 bg-white border rounded-md w-80 text-center">
            {response}
          </div>
        )}

        {/* Action Buttons 60px below the Circle Button, Side by Side */}
        <div className="flex justify-center space-x-4 mt-16">
          <button className="px-6 py-2 bg-508C9B text-white rounded-md">
            Ver Informe
          </button>
          <button onClick={() => { handleRedirect('/data-table') }} className="px-6 py-2 bg-508C9B text-white rounded-md">
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
