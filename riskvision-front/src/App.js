import './App.css';
import Login from './pages/login';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/home'
import AD from './pages/activosDigitales'
import CrearUsuario from './pages/crearUsuario';
import Unauthorized from './pages/unauthorized';
import Reportes from './pages/documentPage';
import FullDocumentViewer from './pages/fullDocview';
import Documentos from './pages/documentPage2'

function App() {
  const documents = [
    {
      id: 1,
      name: 'Reporte de Seguridad',
      preview: '/ISO 27001_2013 (español).pdf',
      lastUpdated: '2024-10-10',
    },
    {
      id: 2,
      name: 'Plan de Mitigación',
      preview: '/ISO 27001_2013 (español).pdf',
      lastUpdated: '2024-09-15',
    },
    {
      id: 3,
      name: 'Análisis de Riesgos',
      preview: '/ISO 27001_2013 (español).pdf',
      lastUpdated: '2024-09-01',
    },
  ];
  const documentos = [
    {
      id: 1,
      name: 'Marco de referencia 1',
      preview: '/ISO 27001_2013 (español).pdf', // Replace with actual preview image URL
      lastUpdated: '2024-10-10',
    },
    {
      id: 2,
      name: 'Marco de referencia 2',
      preview: '/ISO 27001_2013 (español).pdf', // Replace with actual preview image URL
      lastUpdated: '2024-09-15',
    },
    {
      id: 3,
      name: 'Marco de referencia 3',
      preview: '/ISO 27001_2013 (español).pdf', // Replace with actual preview image URL
      lastUpdated: '2024-09-01',
    },
  ]
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/reportes-pasados' element={<Reportes />} />
        <Route path="/document/:id" element={<FullDocumentViewer documents={documents} />} />
        <Route path='/documentos-referencia' element={<Documentos />} />
        <Route path='/activos-digitales' element={<AD />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
