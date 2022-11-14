import {
  api_addLoan,
  api_deleteLoan,
  api_editloan,
  api_getLoans,
} from "../../api/loan";

export default {
  state: { loans: [] },
  getters: {
    loans: (state) => state.loans,
    loanById: (state) => (id) => state.loans.find((loan) => loan.id === id),
    searchLoan: (state) => (query) =>
      state.loans.filter(
        (loan) =>
          loan.user.firstname
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          loan.user.lastname
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          loan.game.title
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          loan.game.identifier
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
      ),
  },
  mutations: {
    GET_LOANS(state, loans) {
      state.loans = loans;
    },
    ADD_LOAN(state, newLoan) {
      state.loans.push(newLoan);
      return newLoan;
    },
    DELETE_LOAN(state, deletedLoanId) {
      state.loans = state.loans.filter((loan) => loan.id !== deletedLoanId);
    },
    EDIT_LOAN(state, editedLoan) {
      const index = state.loans.findIndex((loan) => loan.id === editedLoan.id);
      state.loans[index] = editedLoan;
    },
  },
  actions: {
    async getLoans({ commit }) {
      try {
        const loans = await api_getLoans();
        return commit("GET_LOANS", loans.data.loans);
      } catch (error) {
        console.error(error);
      }
    },
    async addLoan({ commit }, loan) {
      try {
        const newLoan = await api_addLoan(loan);
        commit("ADD_LOAN", newLoan.data.loan);
        return newLoan.data.loan;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteLoan({ commit }, loan) {
      try {
        const deletedLoan = await api_deleteLoan(loan);
        return commit("DELETE_LOAN", deletedLoan.data.loan?.id);
      } catch (error) {
        console.error(error);
      }
    },
    async editLoan({ commit }, loan) {
      try {
        const editedLoan = await api_editloan(loan);
        return commit("EDIT_LOAN", editedLoan.data.loan);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
