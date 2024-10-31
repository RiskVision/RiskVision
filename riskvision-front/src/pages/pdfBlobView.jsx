import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  // Llama a la API para obtener el PDF como Blob
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get("https://example.com/api/get-pdf", {
          responseType: "blob" // Esto asegura que el PDF se reciba como blob
        });
        const pdfBlob = response.data;
        const pdfObjectUrl = URL.createObjectURL(pdfBlob); // Crea un URL temporal para el blob
        setPdfUrl(pdfObjectUrl); // Guarda el URL temporal en el estado para mostrarlo
      } catch (error) {
        console.error("Error al obtener el PDF:", error);
      }
    };

    fetchPdf();
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "documento.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pdf-viewer-container">
      {pdfUrl ? (
        <>
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            style={{ width: "100%", height: "80vh", border: "none" }}
          />
          <button
            onClick={handleDownload}
            className="download-button"
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Descargar PDF
          </button>
        </>
      ) : (
        <p>Cargando PDF...</p>
      )}
    </div>
  );
};

export default PdfViewer;
