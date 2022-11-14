import {
  api_addEditor,
  api_deleteEditor,
  api_getEditors,
  api_updateEditor,
} from "../../api/editor";

export default {
  state: { editors: [] },
  getters: {
    editors: (state) => state.editors,
    nbGamesPerEditors: (state) => (editorId) =>
      state.games.reduce(
        (acc, curr) => (curr.editor?.id === editorId ? ++acc : acc),
        0
      ),
  },
  mutations: {
    GET_EDITORS(state, editors) {
      state.editors = editors;
    },
    ADD_EDITOR(state, newEditor) {
      state.editors.push(newEditor);
      return newEditor;
    },
    DELETE_EDITOR(state, editorId) {
      state.editors = state.editors.filter((editor) => editor.id !== editorId);
    },
    UPDATE_EDITOR(state, editor) {
      const index = state.editors.findIndex(
        (_editor) => _editor.id === editor.id
      );
      state.editors[index] = editor;
    },
  },
  actions: {
    async getEditors({ commit }) {
      try {
        const editors = await api_getEditors();
        return commit("GET_EDITORS", editors.data.editors);
      } catch (error) {
        console.error(error);
      }
    },
    async addEditor({ commit }, editorName) {
      try {
        const newEditor = await api_addEditor(editorName);
        commit("ADD_EDITOR", newEditor.data.editor);
        return newEditor.data.editor;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEditor({ commit }, editorId) {
      try {
        await api_deleteEditor(editorId);
        return commit("DELETE_EDITOR", editorId);
      } catch (e) {
        console.error(e);
      }
    },
    async updateEditor({ commit }, editor) {
      try {
        const updatedEditor = await api_updateEditor(editor);
        return commit("UPDATE_EDITOR", updatedEditor.data.editor);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
