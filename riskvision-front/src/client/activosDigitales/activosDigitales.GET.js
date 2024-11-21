import API_URL from '../../globals';
import axios from 'axios';

async function getAllAssets(){
    try {
        const response = await axios.get(`${API_URL}/api/assets`);
        setTodos(response.data); // Guarda la lista de todos
      } catch (err) {
        setError(err.message);}
        return response.data
}

export default getAllAssets;