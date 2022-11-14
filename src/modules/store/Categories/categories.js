import {
  api_addCategories,
  api_deleteCategorie,
  api_getCategories,
} from "../../api/categories";

export default {
  state: { categories: [] },
  getters: {
    categories: (state) => state.categories,
    searchCategories: (state) => (query) => {
      return state.categories.filter((cat) => cat.name.includes(query));
    },
  },
  mutations: {
    GET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    ADD_CATEGORIE(state, categorie) {
      state.categories.push(categorie);
    },
    DELETE_CATEGORIE(state, id) {
      state.categories = state.categories.filter((cat) => cat.id !== id);
    },
  },
  actions: {
    async getCategories({ commit }) {
      try {
        const { data } = await api_getCategories();
        return commit("GET_CATEGORIES", data.categories);
      } catch (error) {
        console.error(error);
      }
    },
    async addCategorie({ commit }, categorie) {
      try {
        const { data } = await api_addCategories(categorie);
        return commit("ADD_CATEGORIE", data.category);
      } catch (e) {
        console.error(e);
      }
    },
    async deleteCategorie({ commit }, id) {
      try {
        await api_deleteCategorie(id);
        return commit("DELETE_CATEGORIE", id);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
