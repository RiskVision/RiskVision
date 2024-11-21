import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import './mdvisor.styles.scss';
import Heatmap from '../../components/charts/heatmap.jsx'; // Importa el componente Heatmap
import { generateDocxReport } from '../../utils/generateDocxReport'; // Importa la función de generación del reporte

const MDVisor = () => {
  const location = useLocation();
  const [content, setContent] = useState(location.state?.markdownContent || ''); // Initialize content state
  const [loading, setLoading] = useState(false); // Para mostrar un estado de carga mientras se genera el reporte
  const [heatmapData, setHeatmapData] = useState(null);
  const chartRef = useRef(null); // Referencia para el gráfico

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      await generateDocxReport(content, chartRef);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (content) {
      console.log('Contenido de markdown:', content); // Log to verify the content

      // Detectar y extraer el JSON de los datos del heatmap
      const jsonMatch = content.match(/```json([\s\S]*?)```/);
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[1].trim());
        if (Array.isArray(jsonData)) {
          setHeatmapData(jsonData);
        } else {
          console.error('Datos no es un array:', jsonData);
        }

        // Remover el JSON del contenido
        const newContent = content.replace(jsonMatch[0], '');
        setContent(newContent);
      }
    }
  }, [content]);

  return (
    <div className="mkdiv container justify-start mx-auto my-6">
      <h1 className="title">Análisis de Riesgos de Ciberseguridad</h1>
      {heatmapData && (
        <div ref={chartRef}>
          <Heatmap data={heatmapData} />
        </div>
      )}
      <div className="markdown-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <button
        onClick={handleGenerateReport}
        className={`${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        } text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform`}
        disabled={loading}
      >
        {loading ? 'Generando...' : 'Generar reporte DOCX'}
      </button>
    </div>
  );
};

export default MDVisor;