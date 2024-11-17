// src/api/api.js
import axiosInstance from './axiosConfig';

export const api = {
  auth: {
    googleLogin: (token) => axiosInstance.post('/auth/google', { token }),
  },
  customer: {
    create: (data) => axiosInstance.post('/customer', data),
    getAll: () => axiosInstance.get('/customer'),
  },
  campaign: {
    create: (data) => axiosInstance.post('/campaign', data),
    sendMessages: (campaignId) => {
      console.log("reached");
      return axiosInstance.post('/campaign/send_message', { campaign_id: campaignId });
    },
    getStats: (id) => axiosInstance.get(`/campaign/stats/${id}`),
    getAll: () => axiosInstance.get('/campaign'),
  },
  segment: {
    create: (data) => axiosInstance.post('/segment', data),
    getAll: () => axiosInstance.get('/segment'),
  },
  order: {
    create: (data) => axiosInstance.post('/order', data),
    getLastTen: () => axiosInstance.get('/order/last-10'),
  },
};
