import axios from 'axios';

const api = axios.create({
  baseURL: 'https://massasapi.massasdacecilia.com.br/',
});

export default api;
