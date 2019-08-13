import axios from "axios";
import Swal from 'sweetalert2';

const setAuthHeader = async () => {
  try {
    const token = await localStorage.getItem('@MeuML-Token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch {
    Swal.fire({
      title: 'Falha no módulo de API.',
      type: 'error',
      showCloseButton: true
    });
  };
};

setAuthHeader();
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default api;
