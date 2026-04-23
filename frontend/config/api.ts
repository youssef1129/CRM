import {
  Configuration,
  ClientsApi,
  AnimalsApi,
  CommonApi,
} from "../api-client";

const isServer = typeof window === 'undefined';

const basePath = isServer 
  ? (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8098")
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8098");

const apiConfig = new Configuration({
  basePath,
});

export const clientsApi = new ClientsApi(apiConfig);
export const animalsApi = new AnimalsApi(apiConfig);
export const commonApi = new CommonApi(apiConfig);

export default apiConfig;
