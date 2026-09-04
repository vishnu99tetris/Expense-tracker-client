import api from '@/lib/api';
import URLS from '@/constants/urls';

export const loginUser = async (email, password) => {
  return await api.post(URLS.AUTH_LOGIN, { email, password });
};

export const signupUser = async (name, email, password) => {
  return await api.post(URLS.AUTH_SIGNUP, { name, email, password });
};

export const getCurrentUser = async () => {
  return await api.get(URLS.AUTH_ME);
};
