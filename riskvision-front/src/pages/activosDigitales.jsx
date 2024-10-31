import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Librería para parsear CSV
import backgroundImage from '../page-background.jpg';
import BurgerMenu from './BurgerMenu';
const ActivosDigitales = () => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');

  const loadCSV = async (filePath) => {
    const response = await fetch(filePath);
    const text = await response.text();
    Papa.parse(text, {
      complete: (result) => {
        setData(result.data);
      },
      header: true, // Parsear con encabezados
    });
  };

  useEffect(() => {
    loadCSV('/data/IAD.csv'); // Cambia la ruta según la ubicación de tu archivo CSV
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    Papa.parse(file, {
      complete: (result) => {
        setData(result.data);
      },
      header: true, // Parsear con encabezados
    });
  };

  return (
    <div  
    className="min-h-screen flex flex-col justify-between">
      <BurgerMenu />
      <div className="text-center mt-8">
        <h1 className="inline-block text-4xl font-bold text-white bg-[#508C9B] p-4 rounded-md">Activos Digitales</h1>
      </div>

      <div className="overflow-x-auto mt-8 mx-10">
        {/* Contenedor para la tabla con scroll */}
        <div className="overflow-y-auto h-[72vh]"> {/* Ajusta max-h-96 según tus necesidades */}
          {data.length > 0 ? (
            <table className="table-auto w-full border border-gray-300 text-black bg-white rounded-md shadow-md">
              <thead>
                <tr className="bg-[#508C9B] text-white">
                  {Object.keys(data[0]).map((key, index) => (
                    <th key={index} className="px-4 py-2 border">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="px-4 py-2 border">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">No hay archivo cargado.</p>
          )}
        </div>
      </div>

      <div className="flex justify-center my-8">
        <label htmlFor="csvInput" className="bg-[#134B70] text-white py-2 px-4 rounded-md cursor-pointer hover:bg-[#508C9B]">
          Cambiar de archivo
        </label>
        <input
          id="csvInput"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ActivosDigitales;
