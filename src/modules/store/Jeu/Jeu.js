import {
  api_addGame,
  api_deleteGame,
  api_editGame,
  api_getGames,
} from "../../api/game";

export default {
  state: { games: [] },
  getters: {
    games: (state) => state.games,
    searchGame: (state) => (query) =>
      state.games.filter(
        (game) =>
          game.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          game.identifier
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
      ),
  },
  mutations: {
    GET_GAMES(state, games) {
      state.games = games;
    },
    ADD_GAMES(state, game) {
      state.games.push(game);
    },
    DELETE_GAME(state, gameId) {
      state.games = state.games.filter((game) => game.id !== gameId);
    },
    EDIT_GAME(state, editedGame) {
      const index = state.games.findIndex((game) => game.id === editedGame.id);
      state.games[index] = editedGame;
    },
  },
  actions: {
    async getGames({ commit }) {
      try {
        const games = await api_getGames();
        return commit("GET_GAMES", games.data.games);
      } catch (error) {
        console.error(error);
      }
    },
    async addGame({ commit }, game) {
      try {
        const addedGame = await api_addGame(game);
        return commit("ADD_GAMES", addedGame.data.game);
      } catch (err) {
        console.error(err);
      }
    },
    async deleteGame({ commit }, gameId) {
      try {
        const deletedGame = await api_deleteGame(gameId);
        return commit("DELETE_GAME", deletedGame.data.game?.id);
      } catch (error) {
        console.error(error);
      }
    },
    async editGame({ commit }, editedGame) {
      try {
        const game = await api_editGame(editedGame);
        return commit("EDIT_GAME", game.data.game);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
