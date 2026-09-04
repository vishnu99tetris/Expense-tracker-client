import api from '@/lib/api';
import URLS from '@/constants/urls';

export const getCurrentBudget = async () => {
  return await api.get(URLS.BUDGETS_CURRENT);
};

export const setBudget = async (month, year, amount) => {
  return await api.post(URLS.BUDGETS, { month, year, amount });
};

export const getBudgetHistory = async () => {
  return await api.get(URLS.BUDGETS_HISTORY);
};
