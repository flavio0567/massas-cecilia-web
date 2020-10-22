import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://massasapi.massasdacecilia.com.br/',
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;
