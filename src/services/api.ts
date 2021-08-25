import axios from 'axios';

const api = axios.create({
  baseURL: 'https://massasapi.massasdacecilia.com.br/',
  // baseURL: 'http://localhost:3333',
});

export default api;
