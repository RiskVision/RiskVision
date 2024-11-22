import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAsset = () => {
    const { id_activo } = useParams();  // Obtenemos id_activo desde los parámetros de la URL
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

    useEffect(() => {
        // Cargamos los datos del activo usando el id_activo de la URL
        const fetchAsset = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/assets/${id_activo}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFormData(response.data);
            } catch (err) {
                console.error("Error al cargar el activo:", err);
            }
        };
        fetchAsset();
    }, [id_activo]);

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
            await axios.put(`http://localhost:8000/api/assets/${id_activo}`, formData,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/data-tables');  // Redireccionamos de vuelta a la página principal después de la edición
        } catch (err) {
            console.error("Error al actualizar el activo:", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Editar Activo</h1>
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
                <button type="submit" className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditAsset;