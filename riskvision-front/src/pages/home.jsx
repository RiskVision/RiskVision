import React, { useState } from 'react';
import BurgerMenu from './BurgerMenu'; // Import the BurgerMenu component
import Logo from '../logo-white.png';
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

  return (
    <div className="h-screen bg-gray-100 relative bg-homebg bg-cover">
      <BurgerMenu /> {/* Use the BurgerMenu component */}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <button className="w-60 h-60 bg-201E43 rounded-full flex items-center justify-center">
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
          <button onClick={() => { handleRedirect('/activos-digitales') }} className="px-6 py-2 bg-508C9B text-white rounded-md">
            Ver Activos Digitales
          </button>
          <button className="px-6 py-2 bg-508C9B text-white rounded-md">
            Ver Últimos CVEs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
