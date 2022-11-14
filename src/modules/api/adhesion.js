import axios from "axios";
import config from "/config";

const API_ADHESIONS_URL = `${config.urls.api}/subscriptions`;

export const api_getAdhesions = () => axios.get(`${API_ADHESIONS_URL}`);

export const api_createAdhesion = (adhesion) =>
  axios.post(`${API_ADHESIONS_URL}/add`, adhesion);

export const api_updateAdhesion = (adhesion) =>
  axios.put(`${API_ADHESIONS_URL}/update`, adhesion);

export const api_deleteAdhesion = (id) =>
  axios.delete(`${API_ADHESIONS_URL}/remove`, { data: { id } });
