import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 10000,
  withCredentials: true
});

export default instance;