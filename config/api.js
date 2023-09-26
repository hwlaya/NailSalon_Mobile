import axios from "axios";

export const DEV_URL = "http://192.168.1.7:8000/";
export default api = axios.create({
  baseURL: DEV_URL,
});
