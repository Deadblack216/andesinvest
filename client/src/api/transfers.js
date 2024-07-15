// /src/api/transfer.js
import axios from './axios';

export const createTransferRequest = (transferData) => {
  return axios.post('/transfer', transferData);
};

export const getTransfersRequest = () => {
  return axios.get('/transfers');
};
