import './App.css';
import Login from './pages/Inicio de sesion/login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home/home';
import DataTables from './pages/DataTable';
import EditAsset from './pages/AD-CRUD/EditAsset';
import CreateAsset from './pages/AD-CRUD/CreateAsset';
import CrearUsuario from './pages/Manejo de usuarios/crearUsuario';
import Unauthorized from './components/auth/unauthorized';
import Reportes from './pages/Documentos/docs';
import FullDocumentViewer from './pages/Documentos/fullDocview';
import Documentos from './pages/Documentos/documentPage2';
import Usuarios from './pages/Manejo de usuarios/usuarios';
import EditarUsuario from './pages/Manejo de usuarios/modificarUsuario';
import MDVisor from './pages/MkdVisor/mdvisor';
import Heatmap from './pages/testHeatmap/testHeatmap';
import Layout from './components/layout';
import FileManager from './pages/BlobStorage/filemanager';
import FileManagerEmpresa from './pages/Documentos/filemanager-empresa'
import ReportesPasados from './pages/Documentos/reports'

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
    ];
    return (
        <BrowserRouter>
            <Routes>
                {/* Routes without the sidebar */}
                <Route path='/' element={<Login />} />
                <Route path='/unauthorized' element={<Unauthorized />} />

                {/* Routes with the sidebar */}
                <Route element={<Layout />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/doe' element={<div className='space-y-6 w-screen'>
                      hola
                    </div>} />
                    <Route path='/reportes-pasados' element={<ReportesPasados />} />
                    <Route path='/document/:id' element={<FullDocumentViewer />} />
                    <Route path='/documentos-referencia' element={<Documentos />} />
                    <Route path='/usuarios' element={<Usuarios />} />
                    <Route path='/crear-usuario' element={<CrearUsuario />} />
                    <Route path='/editar-usuario' element={<EditarUsuario />} />
                    <Route path='/data-table' element={<DataTables />} />
                    <Route path='/blobstorage' element={<FileManager/>} />
                    <Route path='/blobstorage-empresa' element={<FileManagerEmpresa/>} />
                    <Route path='/create' element={<CreateAsset />} />
                    <Route path='/edit/:id_activo' element={<EditAsset />} />
                    <Route path='/resultados' element={<MDVisor />} />
                    <Route path='/heatmap' element={<Heatmap />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
