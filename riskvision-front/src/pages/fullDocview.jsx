// FullDocumentViewer.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function FullDocumentViewer({ documents }) {
  const { id } = useParams(); // Get document ID from the route
  const navigate = useNavigate();
  const document = documents.find(doc => doc.id === parseInt(id)); // Find the document by ID

  if (!document) {
    return <div>No document found.</div>; // Handle case where document is not found
  }

  return (
    <div className="flex flex-col h-screen">
      <button
        className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2"
        onClick={() => navigate(-1)}
      >
        Cerrar
      </button>
      <div className="flex-grow overflow-auto p-4">
        <iframe
          src={document.preview}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title={document.name}
        ></iframe>
      </div>
    </div>
  );
}

export default FullDocumentViewer;
