// src/api/serviceBill.js
import axios from './axios';

export const getServiceBillsRequest = () => {
  return axios.get('/service-bills');
};

export const payServiceBillRequest = (billId) => {
  return axios.post(`/service-bills/pay/${billId}`);
};

export const createPaypalOrderRequest = (billId) => {
  return axios.post(`/service-bills/paypal/create-order/${billId}`);
};

export const capturePaypalOrderRequest = (params) => {
  return axios.get('/service-bills/paypal/success', { params });
};
