import axios from "axios";
import config from "/config.js";

const API_URL_USERS = `${config.urls.api}/users`;

export const api_getUser = async () => {
  return await axios.get(API_URL_USERS);
};

export const api_deleteUser = async (user) => {
  // data mean "BODY"
  return await axios.delete(`${API_URL_USERS}/remove`, {
    data: { ...user },
  });
};

export const api_editUser = async (editedUser) => {
  return await axios.put(`${API_URL_USERS}/update`, editedUser);
};

export const api_addUser = async (user) => {
  return await axios.post(`${API_URL_USERS}/add`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
