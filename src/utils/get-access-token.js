const axios = require("axios");

export const getAccessToken = async (idToken) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/requestAccessToken`,
      {
        idToken,
      }
    );
    const { accessToken } = await response.data;
    return accessToken;
  } catch {
    return "";
  }
};
