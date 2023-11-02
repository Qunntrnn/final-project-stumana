import jwtDecode from "jwt-decode";
import { getAuth } from "firebase/auth";
import { getAccessToken } from "./get-access-token";

let accessToken = "";
let expiresAt = 0;

export const clearAccessToken = () => {
  accessToken = "";
  expiresAt = 0;
};

export const getAuthHeader = async (idToken) => {
  let token = idToken;
  if (!token) {
    const auth = getAuth();
    if (!auth.currentUser) {
      return {};
    }
    token = await auth.currentUser.getIdToken();
  }
  if (process.env.NEXT_PUBLIC_USE_FIREBASE_ID_TOKEN === "TRUE") {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  if (!accessToken || Date.now() / 1000 > expiresAt) {
    accessToken = await getAccessToken(token);
    expiresAt = accessToken ? jwtDecode(accessToken).exp : 0;
  }
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
