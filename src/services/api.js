import axios from "axios";

const api = axios.create({
  baseURL: (process.env.REACT_APP_API_URL !== undefined) ? process.env.REACT_APP_API_URL : 'https://api.app2.meuml.com'
});

const setAuthHeader = async (token) => {
  api.defaults.headers.common['Authorization'] = await `Bearer ${token}`
}

setAuthHeader(localStorage.getItem('@MeuML-Token'));

export default api;
