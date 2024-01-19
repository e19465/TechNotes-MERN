import axios from "axios";

const instance = axios.create({
  baseURL: "https://technotes-myapi.onrender.com/api/",
});

export default instance;
