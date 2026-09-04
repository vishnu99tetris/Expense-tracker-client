/**
 * Formats a number to currency string ($X.XX)
 * @param {number|string} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

/**
 * Formats an ISO or standard date string
 * @param {string|Date} dateString
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const defaultOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  };
  return date.toLocaleDateString('en-US', defaultOptions);
};

/**
 * Formats a ratio/number as percentage
 * @param {number} value
 * @returns {string}
 */
export const formatPercentage = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '0%';
  return `${Math.round(value)}%`;
};

/**
 * Gets month name from month (1-12) and year
 * @param {number} month
 * @param {number} year
 * @returns {string}
 */
export const getMonthName = (month, year) => {
  const date = new Date(year, (month || 1) - 1, 1);
  return date.toLocaleString('en-US', { month: 'long' });
};

/**
 * Extracts initials from a user's full name
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
