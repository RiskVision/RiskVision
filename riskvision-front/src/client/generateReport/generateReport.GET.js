import axios from 'axios';

// Esta llamada toma los datos de un activo como argumento en el body para generar resultados a partir de las  

async function runScan(activo) {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/', {
            activo: activo
        });
        return response.data; // Devuelve los datos de la respuesta
    } catch (err) {
        console.error('Error al ejecutar el escaneo:', err.message);
        throw new Error('Error al ejecutar el escaneo');
    }
}

export default runScan;