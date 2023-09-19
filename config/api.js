import axios from "axios";

export const DEV_URL = "http://192.168.100.30:8000/";
export default api = axios.create({
  baseURL: DEV_URL,
});
