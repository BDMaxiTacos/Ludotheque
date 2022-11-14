import axios from "axios";
import config from "/config.js";

const API_URL_GAMES = `${config.urls.api}/games`;

export const api_addGame = async (game) => {
  return await axios.post(`${API_URL_GAMES}/add`, game, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const api_getGames = async () => {
  return await axios.get(API_URL_GAMES);
};

export const api_deleteGame = async (gameId) => {
  // data mean "BODY"
  return await axios.delete(`${API_URL_GAMES}/remove`, {
    data: { id: gameId },
  });
};

export const api_editGame = async (editedGame) => {
  return await axios.put(`${API_URL_GAMES}/update`, editedGame);
};
