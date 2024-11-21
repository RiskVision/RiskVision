import API_URL from '../../globals';
import axios from 'axios';

async function deleteAsset(){
    try {
        const response = await axios.delete(`${API_URL}/api/assets/${id_activo}`);
        setTodos(response.data); // Guarda la lista de todos
      } catch (err) {
        setError(err.message);}
        return response.data
}

export default deleteAsset;