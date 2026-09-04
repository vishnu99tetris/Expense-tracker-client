/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} [created_at]
 */

/**
 * @typedef {'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Entertainment' | 'Health' | 'Education' | 'Other'} ExpenseCategory
 */

/**
 * @typedef {Object} Expense
 * @property {number} id
 * @property {number} user_id
 * @property {string} title
 * @property {number} amount
 * @property {ExpenseCategory} category
 * @property {string} date
 * @property {string|null} [notes]
 * @property {string} [created_at]
 */

/**
 * @typedef {Object} BudgetData
 * @property {number} month
 * @property {number} year
 * @property {number|null} budget
 * @property {number} totalSpent
 * @property {number|null} remaining
 * @property {number|null} percentUsed
 */

/**
 * @typedef {Object} ExpenseSummary
 * @property {number} month
 * @property {number} year
 * @property {number} total
 * @property {number} count
 * @property {Array<{ category: string, total: number, count: number }>} categories
 */

export {};
