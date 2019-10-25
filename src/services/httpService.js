import axios from "axios";
import loggingService from "./loggingService";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    loggingService.log(error);
    alert("Unexpected error occur!");
  }
  return Promise.reject(error);
});

export function setjwt(jwt) {
  return (axios.defaults.headers.common["x-auth-token"] = jwt);
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setjwt
};
