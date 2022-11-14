import decode from "jwt-decode";
import { api_login } from "../modules/api/login";
import config from "../../config";

export async function loginUser(loginForm) {
  try {
    let { data } = await api_login(loginForm);
    if (data.token) {
      setAuthToken(data.token);
      window.open("/", "_self");
    }
  } catch (err) {
    console.error("Caught an error during login:", err);
    throw err;
  }
}

export function logoutUser() {
  clearAuthToken();
  window.open("/login", "_self");
}

export function setAuthToken(token) {
  localStorage.setItem(config.token.name, token);
}

export function getAuthToken() {
  return localStorage.getItem(config.token.name);
}

export function clearAuthToken() {
  localStorage.removeItem(config.token.name);
}

export function isLoggedIn() {
  let authToken = getAuthToken();
  return !!authToken;
}

export function getUserInfo() {
  if (isLoggedIn()) {
    return decode(getAuthToken());
  }
}

function getTokenExpirationDate(encodedToken) {
  let token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  let date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

export function isTokenExpired(token) {
  let expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
