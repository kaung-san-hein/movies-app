import http from "./httpService";
import { config } from "../config";
import jwtDecode from "jwt-decode";

const apiEndPoint = config.apiUrl + "/auth";
const tokenKey = "token";

http.setjwt(getjwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithjwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getjwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithjwt,
  logout,
  getCurrentUser,
  getjwt
};
