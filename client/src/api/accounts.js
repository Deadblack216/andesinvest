// /src/api/accounts.js
import axios from "./axios";

export const createAccountRequest = async (accountData) =>
  axios.post("/accounts", accountData);
