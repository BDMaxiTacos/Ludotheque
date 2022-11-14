import axios from "axios";
import config from "/config.js";

const API_URL_LOANS = `${config.urls.api}/loans`;

export const api_addLoan = async (loan) => {
  return await axios.post(`${API_URL_LOANS}/add`, loan, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const api_getLoans = async () => {
  return await axios.get(API_URL_LOANS);
};

export const api_editloan = async (editedLoan) => {
  return await axios.put(`${API_URL_LOANS}/update`, editedLoan);
};

export const api_deleteLoan = async (id) => {
  // data mean "BODY"
  return await axios.delete(`${API_URL_LOANS}/remove`, {
    data: { ...id },
  });
};
