import API_URL from '../../globals';
import axios from 'axios';

/*Esta llamada de API solamente hace que se corra la AI con las terminales de pago,
esperando encontrar vulnerabilidades en PAX, es la llamada al Master endpoint creado de último en el back*/

async function runGeneralScan(){
    try {
        const response = await axios.get(`${API_URL}/reports/getReport`);
        setTodos(response.data); // Guarda la lista de todos
      } catch (err) {
        setError(err.message);}
        return response.data
}

export default runGeneralScan;