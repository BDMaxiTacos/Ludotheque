import {
  api_createAdhesion,
  api_deleteAdhesion,
  api_getAdhesions,
  api_updateAdhesion,
} from "../../api/adhesion";

export default {
  state: { adhesions: [] },
  getters: {
    adhesions: (state) => state.adhesions,
  },
  mutations: {
    GET_ADHESIONS(state, adhesions) {
      state.adhesions = adhesions;
    },
    ADD_ADHESION(state, adhesion) {
      state.adhesions.push(adhesion);
    },
    UPDATE_ADHESION(state, adhesion) {
      const i = state.adhesions.findIndex((a) => a.id === adhesion.id);
      state.adhesions[i] = adhesion;
    },
    DELETE_ADHESION(state, id) {
      state.adhesions = state.adhesions.filter((a) => a.id !== id);
    },
  },
  actions: {
    async getAdhesions({ commit }) {
      try {
        const sub = await api_getAdhesions();
        return commit("GET_ADHESIONS", sub.data.subscriptions);
      } catch (error) {
        console.error(error);
      }
    },
    async addAdhesion({ commit }, adhesion) {
      try {
        const { data } = await api_createAdhesion(adhesion);
        return commit("ADD_ADHESION", data.subscription);
      } catch (e) {
        console.error(e);
      }
    },
    async updateAdhesion({ commit }, adhesion) {
      try {
        const { data } = await api_updateAdhesion(adhesion);
        return commit("UPDATE_ADHESION", data.subscription);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAdhesion({ commit }, id) {
      try {
        await api_deleteAdhesion(id);
        return commit("DELETE_ADHESION", id);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
