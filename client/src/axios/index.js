import axios from "axios";
import { apiURL } from "../utils/constants/constant";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return "Bearer " + user.accessToken;
  } else {
    return "";
  }
}

const instance = axios.create({
  baseURL: apiURL + "api/"
});

instance.defaults.headers.common['Authorization'] = getToken();

export default instance;
