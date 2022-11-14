import axios from "axios";
import config from "/config.js";

const API_URL_EDITOR = `${config.urls.api}/editors`;

export const api_getEditors = async () => {
  return await axios.get(`${API_URL_EDITOR}/`);
};

export const api_addEditor = async (editorName) => {
  return await axios.post(`${API_URL_EDITOR}/add`, editorName);
};

export const api_deleteEditor = async (id) => {
  return await axios.delete(`${API_URL_EDITOR}/remove`, { data: { id } });
};

export const api_updateEditor = async (editor) => {
  return await axios.put(`${API_URL_EDITOR}/update`, editor);
};
