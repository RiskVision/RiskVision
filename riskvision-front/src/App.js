import './App.css';
import Login from './pages/Inicio de sesion/login';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home/home';
import AD from './pages/Activos Digitales/activosDigitales';
import CrearUsuario from './pages/Manejo de usuarios/crearUsuario';
import Unauthorized from './components/auth/unauthorized';
import Reportes from './pages/Documentos/documentPage';
import FullDocumentViewer from './pages/Documentos/fullDocview';
import Documentos from './pages/Documentos/documentPage2';
import Usuarios from './pages/Manejo de usuarios/usuarios';
import EditarUsuario from './pages/Manejo de usuarios/modificarUsuario';
import MDVisor from './pages/MkdVisor/mdvisor';


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
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/reportes-pasados' element={<Reportes />} />
          <Route path="/document/:id" element={<FullDocumentViewer documents={documents} />} />
          <Route path='/documentos-referencia' element={<Documentos />} />
          <Route path='/activos-digitales' element={<AD />} />
          <Route path='/usuarios' element={<Usuarios />} />
          <Route path='/crear-usuario' element={<CrearUsuario />} />
          <Route path='/editar-usuario' element={<EditarUsuario />} />
          <Route path='/resultados' element={<MDVisor />} />
        </Routes>
    </BrowserRouter>
   </UserProvider>
  );
}

export default App;
