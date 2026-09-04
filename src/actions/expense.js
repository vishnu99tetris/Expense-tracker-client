import api from '@/lib/api';
import URLS from '@/constants/urls';

export const getExpenses = async (params = {}) => {
  return await api.get(URLS.EXPENSES, { params });
};

export const getExpenseSummary = async () => {
  return await api.get(URLS.EXPENSES_SUMMARY);
};

export const getExpenseById = async (id) => {
  return await api.get(URLS.EXPENSE_BY_ID(id));
};

export const createExpense = async (data) => {
  return await api.post(URLS.EXPENSES, data);
};

export const updateExpense = async (id, data) => {
  return await api.put(URLS.EXPENSE_BY_ID(id), data);
};

export const deleteExpense = async (id) => {
  return await api.delete(URLS.EXPENSE_BY_ID(id));
};
