import { store, params } from 'react-easy-stack';
import * as api from './api';

const appStore = store({
  products: [],
  isLoading: false,
  isLoggedIn: api.isLoggedIn()
});

export async function search(filter) {
  appStore.products = await api.search(filter);
}

export async function resolveProduct() {
  if (!params.id) {
    return { product: {} };
  }
  return { product: await api.fetchProduct(params.id) };
}

export async function saveProduct(product) {
  return api.saveProduct(product);
}

export async function editProduct(id, data) {
  return api.editProduct(id, data);
}

export async function login(loginData) {
  appStore.user = await api.login(loginData);
  appStore.isLoggedIn = true;
}

export async function logout() {
  await api.logout();
  appStore.isLoggedIn = false;
}

export async function register(registerData) {
  appStore.user = await api.register(registerData);
}

export default appStore;
