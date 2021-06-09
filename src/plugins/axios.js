import axios from "axios";
const api = axios.create({
    baseURL: process.env.APIURL || "localhost:5000",
  });
  export default api