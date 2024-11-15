import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import { useNavigate } from 'react-router-dom';

function DocumentCard({ document }) {
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Hook to navigate to another route

  useEffect(() => {
    const renderPDFPreview = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(document.preview);
        const pdf = await loadingTask.promise;

        const page = await pdf.getPage(1); // Get the first page of the PDF
        const viewport = page.getViewport({ scale: 1.5 }); // Scale PDF size based on view

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error('Error rendering PDF:', error);
      }
    };

    renderPDFPreview();
  }, [document.preview]);

  const handleCardClick = () => {
    navigate(`/document/${document.id}`); // Redirect to full document viewer page
  };

  return (
    <div
      className="bg-white shadow-md rounded-md p-4 max-w-xs cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Document Preview */}
      <div className="h-40 bg-gray-200 rounded-md mb-4">
        <canvas ref={canvasRef} className="w-full h-full object-cover rounded-md"></canvas>
      </div>
      {/* Document Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">{document.name}</h3>
        <p className="text-sm text-gray-600">Última actualización: {document.lastUpdated}</p>
      </div>
    </div>
  );
}

export default DocumentCard;
