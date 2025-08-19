// src/services/api.ts
import axios from 'axios';
import {API_URL} from "@env"

console.log("API_URL:", API_URL);
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
