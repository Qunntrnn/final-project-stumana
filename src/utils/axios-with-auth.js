const axios = require("axios");
const { getAuthHeader } = require("./get-auth-header");

const axiosWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosWithAuth.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: { ...(await getAuthHeader()), ...config.headers },
  };
});

module.exports = { axiosWithAuth };
