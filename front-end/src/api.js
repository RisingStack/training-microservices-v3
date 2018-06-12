import axios from 'axios';
import appStore, * as app from './appStore';
import { pick, defaults } from 'lodash';
import { storage } from 'react-easy-stack';
import { notify } from './Notification';

defaults(storage, {
  cache: {}
});

const api = axios.create({
  baseURL: 'https://freebie-server.sloppy.zone/api/',
  headers: {
    token: storage.token,
    'Content-Type': 'application/json'
  }
});

// TODO: it should handle errors, replace this with a counter
api.interceptors.request.use(config => {
  appStore.isLoading = true;
  return config;
});

api.interceptors.response.use(
  response => {
    appStore.isLoading = false;
    return response;
  },
  error => {
    appStore.isLoading = false;
    throw error;
  }
);

export async function search(filter) {
  const { data } = await api.get('/products', {
    params: { search: filter }
  });
  storage.cache[filter] = data.products;
  return data.products;
}

export async function fetchProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function saveProduct(product) {
  const { data } = await api.post('/products', product);
  return data;
}

export async function editProduct(id, product) {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
}

export async function login(loginData) {
  loginData = pick(loginData, ['email', 'pass']);
  const { data } = await api.post('/users/login', loginData);
  api.defaults.headers.token = data.token;
  storage.token = data.token;
  return data.user;
}

export async function register(registerData) {
  await api.post('/users/register', registerData);
  return login(registerData);
}

export function logout() {
  delete api.defaults.headers.token;
  delete storage.token;
}

export function isLoggedIn() {
  return 'token' in storage;
}
