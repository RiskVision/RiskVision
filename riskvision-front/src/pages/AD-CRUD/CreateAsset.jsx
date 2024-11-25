import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAsset = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id_activo: '',
        nombre_activo: '',
        descripcion: '',
        marca: '',
        modelo: '',
        cantidad: 0,
        sistema_operativo: '',
        version_so: '',
        usuario_responsable: '',
        equipo_soporte: '',
        ubicacion: '',
        servidor_deployment: '',
        fecha_adquisicion: '',
        fecha_ultima_actualizacion: '',
        direccion_mac: '',
        direccion_ip: '',
        nivel_criticidad: '',
        clasificacion_activo: '',
        estado: '',
        plan_recuperacion_drp: '',
        frecuencia_monitoreo: '',
        monitoreo_seguridad: '',
        auditoria_acceso: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/assets', formData);
            navigate('/data-table');  // Redireccionamos de vuelta a la página principal después de la creación
        } catch (err) {
            console.error("Error al crear el activo:", err);
        }
    };
    const handleGoBack = () => {
        navigate(-1); // Navega a la página anterior
    };

    const fieldLabels = {
        id_activo: 'ID del Activo',
        nombre_activo: 'Nombre del Activo',
        descripcion: 'Descripción',
        marca: 'Marca',
        modelo: 'Modelo',
        cantidad: 'Cantidad',
        sistema_operativo: 'Sistema Operativo',
        version_so: 'Versión del SO',
        usuario_responsable: 'Usuario Responsable',
        equipo_soporte: 'Equipo de Soporte',
        ubicacion: 'Ubicación',
        servidor_deployment: 'Servidor Deployment',
        fecha_adquisicion: 'Fecha de Adquisición',
        fecha_ultima_actualizacion: 'Fecha de Última Actualización',
        direccion_mac: 'Dirección MAC',
        direccion_ip: 'Dirección IP',
        nivel_criticidad: 'Nivel de Criticidad',
        clasificacion_activo: 'Clasificación del Activo',
        estado: 'Estado',
        plan_recuperacion_drp: 'Plan de Recuperación (DRP)',
        frecuencia_monitoreo: 'Frecuencia de Monitoreo',
        monitoreo_seguridad: 'Monitoreo de Seguridad',
        auditoria_acceso: 'Auditoría de Acceso'
    };

    const placeholders = {
        fecha_adquisicion: 'YYYY-MM-DD',
        fecha_ultima_actualizacion: 'YYYY-MM-DD'
        // Agregar más placeholders personalizados según el campo...
    };

    return (
        <div className="container mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Activo</h1>
                <button 
                    onClick={handleGoBack} 
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-md"
                >
                    Regresar
                </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            {fieldLabels[key] || key}
                        </label>
                        <input
                            type={key.includes('fecha') ? 'text' : key === 'cantidad' ? 'number' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={placeholders[key] || `Ingrese ${fieldLabels[key] || key}`}
                        />
                    </div>
                ))}
                <div className="col-span-1 sm:col-span-2 flex justify-center">
                    <button 
                        type="submit" 
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow-md font-semibold"
                    >
                        Crear Activo
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAsset;
