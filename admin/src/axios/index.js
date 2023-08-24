import axios from "axios";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("admin"));

  if (user && user.accessToken) {
    return "Bearer " + user.accessToken;
  } else {
    return "";
  }
}

const instance = axios.create({
  baseURL: "http://localhost:4000/api/"
});

instance.defaults.headers.common['Authorization'] = getToken();

export default instance;
