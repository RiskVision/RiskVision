import React from 'react';
import DocumentList from './DocumentList';
import BurgerMenu from './BurgerMenu';

function Reportes() {
  const documents = [
    {
      id: 1,
      name: 'Reporte de Seguridad 1',
      preview: '/ISO 27001_2013 (español).pdf', // Replace with actual preview image URL
      lastUpdated: '2024-10-10',
    },
    {
      id: 2,
      name: 'Reporte de Seguridad 2',
      preview: '/ISO 27001_2013 (español).pdf', // Replace with actual preview image URL
      lastUpdated: '2024-09-15',
    },
    {
      id: 3,
      name: 'Reporte de Seguridad 3',
      preview: '/ISO 27001_2013 (español).pdf', // Replace with actual preview image URL
      lastUpdated: '2024-09-01',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <BurgerMenu />
      <h1 className="text-3xl font-bold text-center my-6">Reportes</h1>
      <DocumentList documents={documents} />
    </div>
  );
}

export default Reportes;
