import http from "./httpService";

export function register(endpoint: string, user: any) {
  return http.post(endpoint, user);
}
