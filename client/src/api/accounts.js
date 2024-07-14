// /src/api/accounts.js
import axios from "./axios";

export const createAccountRequest = async (accountData) => 
  axios.post("/accounts", accountData);

export const getAccountsRequest = async () =>
  axios.get("/accounts");

export const deleteAccountRequest = async (id) =>
  axios.delete(`/accounts/${id}`);

export const fetchAccountsRequest = () => axios.get("/accounts");

export const checkAccountExistsRequest = (accountNumber) => axios.get(`/accounts/check/${accountNumber}`);