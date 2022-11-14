import { createStore } from "vuex";
import gamesStore from "./Jeu/Jeu";
import editorsStore from "./Editeur/Editeur";
import usersStore from "./Utilisateur/Utilisateur";
import loansStore from "./Emprunt/Emprunt";
import adhesionsStore from "./Adhesion/adhesions";
import categoriesStore from "./Categories/categories";

const store = createStore({
  state: {
    ...gamesStore.state,
    ...editorsStore.state,
    ...usersStore.state,
    ...loansStore.state,
    ...adhesionsStore.state,
    ...categoriesStore.state,
  },
  getters: {
    ...gamesStore.getters,
    ...editorsStore.getters,
    ...usersStore.getters,
    ...loansStore.getters,
    ...adhesionsStore.getters,
    ...categoriesStore.getters,
  },
  mutations: {
    ...gamesStore.mutations,
    ...editorsStore.mutations,
    ...usersStore.mutations,
    ...loansStore.mutations,
    ...adhesionsStore.mutations,
    ...categoriesStore.mutations,
  },
  actions: {
    ...gamesStore.actions,
    ...editorsStore.actions,
    ...usersStore.actions,
    ...loansStore.actions,
    ...adhesionsStore.actions,
    ...categoriesStore.actions,
  },
});

export default store;
