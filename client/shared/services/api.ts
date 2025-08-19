// src/services/api.ts
import axios from 'axios';
import Constants from "expo-constants";

const API_URL = Constants?.expoConfig?.extra?.apiUrl;
console.log('API_URL:', API_URL);
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
