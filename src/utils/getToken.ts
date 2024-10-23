// utils/getToken.js
export const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};
