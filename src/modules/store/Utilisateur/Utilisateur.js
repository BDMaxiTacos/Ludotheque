import { getUserInfo } from "../../../utils/auth";
import {
  api_getUser,
  api_addUser,
  api_deleteUser,
  api_editUser,
} from "../../api/user";

export default {
  state: { users: [] },
  getters: {
    users: (state) =>
      state.users.filter(
        (user) => !user.roles.find((role) => role === "ROLE_ADMIN")
      ),
    administrators: (state) =>
      state.users.filter((user) =>
        user.roles.find((role) => role === "ROLE_ADMIN")
      ),
    userById: (state) => (id) => state.users.find((user) => user.id === id),
    connectedUser: (state) =>
      state.users.find((user) => user.id === getUserInfo()?.user._id),
    familyMembers: (state) => (id) =>
      state.users.filter((user) => user.linkTo === id),
  },
  mutations: {
    GET_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    DELETE_USER(state, deletedUserId) {
      state.users = state.users.filter((user) => user.id !== deletedUserId);
    },
    EDIT_USER(state, editedUser) {
      const index = state.users.findIndex((user) => user.id === editedUser.id);
      state.users[index] = editedUser;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const users = await api_getUser();
        return commit("GET_USERS", users.data.users);
      } catch (error) {
        console.error(error);
      }
    },
    async addUser({ commit }, user) {
      try {
        const addedUser = await api_addUser(user);
        return commit("ADD_USER", addedUser.data.user);
      } catch (err) {
        console.error(err);
      }
    },
    async deleteUser({ commit }, user) {
      try {
        const deletedUser = await api_deleteUser(user);
        return commit("DELETE_USER", deletedUser.data.user?.id);
      } catch (error) {
        console.error(error);
      }
    },
    async editUser({ commit }, editedUser) {
      try {
        const user = await api_editUser(editedUser);
        return commit("EDIT_USER", user.data.user);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
