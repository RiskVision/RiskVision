import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTables = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/data');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los datos');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Tabla de Inventario de Activos</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            {/* Reemplaza con los nombres reales de tus columnas */}
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Descripción</th>
                            <th className="border border-gray-300 px-4 py-2">Marca</th>
                            <th className="border border-gray-300 px-4 py-2">Modelo</th>
                            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
                            <th className="border border-gray-300 px-4 py-2">Sistema Operativo</th>
                            <th className="border border-gray-300 px-4 py-2">Vesión SO</th>
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
                            {/* Añade más columnas según sea necesario */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{item.id_activo}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.nombre_activo}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.descripcion}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.marca}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.modelo}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.cantidad}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.sistema_operativo}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.version_so}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.usuario_responsable}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.equipo_soporte}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.ubicacion}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.servidor_deployment}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.fecha_adquisicion}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.fecha_ultima_actualizacion}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.direccion_mac}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.direccion_ip}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.nivel_criticidad}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.clasificacion_activo}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.estado}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.plan_recuperacion_drp}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.frecuencia_monitoreo}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.monitoreo_seguridad}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.auditoria_acceso}</td>
                                {/* Añade más celdas según las columnas */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTables;
