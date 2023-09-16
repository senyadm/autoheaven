// client.js
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default client;
