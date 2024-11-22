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
    const token = localStorage.getItem('token')

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
            await axios.post('http://localhost:8000/api/assets', formData, {headers:{
                'Authorization': `Bearer ${token}`
            }});
            navigate('/data-tables');  // Redireccionamos de vuelta a la página principal después de la creación
        } catch (err) {
            console.error("Error al crear el activo:", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Activo</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {Object.keys(formData).map((key) => (
                    <div key={key} className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">{key}</label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                ))}
                <button type="submit" className="col-span-2 bg-green-500 text-white px-4 py-2 rounded">
                    Crear Activo
                </button>
            </form>
        </div>
    );
};

export default CreateAsset;
