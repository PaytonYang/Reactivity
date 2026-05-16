import axios from 'axios';
import { store } from '../stores/store';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const agents = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agents.interceptors.request.use((config) => {
  store.uiStore.isBusy();
  return config;
});

agents.interceptors.response.use(async (response) => {
  try {
    await sleep(1000); // Simulate delay
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  } finally {
    store.uiStore.isIdle();
  }
});

export default agents;
