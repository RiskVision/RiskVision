import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BurgerMenu from '../components/Menu/BurgerMenu';

const DataTables = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/assets',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = () => {
        navigate('/create');
    };

    const handleEdit = (id_activo) => {
        navigate(`/edit/${id_activo}`);
    };

    const handleDelete = async (id_activo) => { // Cambiado a id_activo
        await axios.delete(`http://localhost:8000/api/assets/${id_activo}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        fetchData();
    };

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div className="container mx-auto px-4 py-6">
            <BurgerMenu />
            <h1 className="text-2xl font-bold mb-4">Lista de Activos</h1>
            <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                Crear
            </button>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Descripción</th>
                            <th className="border border-gray-300 px-4 py-2">Marca</th>
                            <th className="border border-gray-300 px-4 py-2">Modelo</th>
                            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
                            <th className="border border-gray-300 px-4 py-2">Sistema Operativo</th>
                            <th className="border border-gray-300 px-4 py-2">Versión SO</th>
                            <th className="border border-gray-300 px-4 py-2">Usuario Responsable</th>
                            <th className="border border-gray-300 px-4 py-2">Equipo Soporte</th>
                            <th className="border border-gray-300 px-4 py-2">Ubicación</th>
                            <th className="border border-gray-300 px-4 py-2">Servidor Deployment</th>
                            <th className="border border-gray-300 px-4 py-2">Fecha Adquisición</th>
                            <th className="border border-gray-300 px-4 py-2">Fecha Última Adquisición</th>
                            <th className="border border-gray-300 px-4 py-2">Dirección MAC</th>
                            <th className="border border-gray-300 px-4 py-2">Dirección IP</th>
                            <th className="border border-gray-300 px-4 py-2">Nivel Criticidad</th>
                            <th className="border border-gray-300 px-4 py-2">Clasificación Activo</th>
                            <th className="border border-gray-300 px-4 py-2">Estado</th>
                            <th className="border border-gray-300 px-4 py-2">Plan de Recuperación</th>
                            <th className="border border-gray-300 px-4 py-2">Frecuencia Monitoreo</th>
                            <th className="border border-gray-300 px-4 py-2">Monitoreo Seguridad</th>
                            <th className="border border-gray-300 px-4 py-2">Auditoria Acceso</th>
                            {/*<th className="border border-gray-300 px-4 py-2">Acciones</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((asset) => (
                            <tr key={asset.id_activo} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{asset.id_activo}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.nombre_activo}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.descripcion}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.marca}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.modelo}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.cantidad}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.sistema_operativo}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.version_so}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.usuario_responsable}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.equipo_soporte}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.ubicacion}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.servidor_deployment}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.fecha_adquisicion}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.fecha_ultima_actualizacion}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.direccion_mac}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.direccion_ip}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.nivel_criticidad}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.clasificacion_activo}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.estado}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.plan_recuperacion_drp}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.frecuencia_monitoreo}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.monitoreo_seguridad}</td>
                                <td className="border border-gray-300 px-4 py-2">{asset.auditoria_acceso}</td>
                                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                    <button onClick={() => handleEdit(asset)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                                    <button onClick={() => handleDelete(asset.id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTables;









