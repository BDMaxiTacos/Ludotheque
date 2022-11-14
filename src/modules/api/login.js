import axios from "axios";
import config from "/config";

const API_URL_AUTH = `${config.urls.api}`;

export const api_login = async (login) => {
  return await axios.post(`${API_URL_AUTH}/api/authenticate`, login);
};
