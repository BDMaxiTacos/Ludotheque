import axios from "axios";
import config from "/config";

const API_CATEGORIES_URL = `${config.urls.api}/categories`;

export const api_getCategories = () => axios.get(`${API_CATEGORIES_URL}`);

export const api_addCategories = (categorie) =>
  axios.post(`${API_CATEGORIES_URL}/add`, categorie);

export const api_deleteCategorie = (id) =>
  axios.delete(`${API_CATEGORIES_URL}/remove`, { data: { id } });
