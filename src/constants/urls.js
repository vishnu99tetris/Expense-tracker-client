// API Endpoint URLs
const URLS = {
  // Auth
  AUTH_SIGNUP: '/auth/signup',
  AUTH_REGISTER: '/auth/signup', // Alias for signup
  AUTH_LOGIN: '/auth/login',
  AUTH_ME: '/auth/me',

  // Health
  HEALTH: '/health',

  // Expenses
  EXPENSES: '/expenses',
  EXPENSES_SUMMARY: '/expenses/summary',
  EXPENSE_BY_ID: (id) => `/expenses/${id}`,

  // Budgets
  BUDGETS: '/budgets',
  BUDGETS_CURRENT: '/budgets/current',
  BUDGETS_HISTORY: '/budgets/history',
};

export default URLS;
