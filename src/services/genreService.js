import http from "./httpService";
import { config } from "../config";

const apiEndPoint = config.apiUrl + "/genres";

export function getGenres() {
  return http.get(apiEndPoint);
}
