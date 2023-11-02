import { axiosWithAuth } from "@app/utils/axios-with-auth";
import { Api } from "./api";

const apiWithAuthClient = new Api();
apiWithAuthClient.instance = axiosWithAuth;
const { api: apiWithAuth } = apiWithAuthClient;
// const authApi = api;

const apiClient = new Api({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const { api } = apiClient;

export { apiWithAuth, api };
