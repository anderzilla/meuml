import axios from "axios";
const setAuthHeader = async () => {
  try {
    const token = await localStorage.getItem('@MeuML-Token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch(error) {
    console.log(error);
  };
};

setAuthHeader();

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default api;