import { http, auth_http } from "../config";

export function login(credentials) {
  return http.post("user/login", credentials);
}

export function register(credentials) {
  return http.post("user/register", credentials);
}

export function isAuthenticated() {
  return auth_http.get("user/isAuthenticated" );
}

// export function renewToken() {
//   return auth_http.get("renewtoken");
// }

// export function checkToken() {
//   return auth_http.get("checktoken");
// }

