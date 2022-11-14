import axios from "axios";
import config from "/config";

const API_URL_STATISTIQUES = `${config.urls.api}/statistics`;

export const api_getNbEmpruntsParJeu = () =>
  axios.get(`${API_URL_STATISTIQUES}/nbrEmpruntParJeux`);

export const api_getNbEmpruntsParCategorie = () =>
  axios.get(`${API_URL_STATISTIQUES}/nbrEmpruntParCategory`);

export const api_getDureeMoyenne = () =>
  axios.get(`${API_URL_STATISTIQUES}/dureeMoyenneEmprunt`);
