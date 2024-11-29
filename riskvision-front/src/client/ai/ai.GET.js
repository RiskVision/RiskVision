import axios from 'axios';
import { API_URL } from '../../globals';
//Genera la llamada a la AI del backend 

async function runAI() {
    try {
        const response = await axios.get(`${API_URL}/reports/getReport`);
        return response.data; // Devuelve los datos de la respuesta
    } catch (err) {
        console.error('Error al ejecutar al llamar a la AI:', err.message);
        throw new Error('Error al ejecutar al llamar a la AI');
    }
}

export default runAI;