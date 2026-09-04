/**
 * Safe JSON parser with fallback
 * @param {string} value
 * @param {any} fallback
 * @returns {any}
 */
export const safeJsonParse = (value, fallback = null) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (e) {
    return fallback;
  }
};

/**
 * Extracts error message from Axios error or JS Error
 * @param {any} error
 * @param {string} fallback
 * @returns {string}
 */
export const getErrorMessage = (error, fallback = 'An unexpected error occurred.') => {
  return error?.response?.data?.message || error?.message || fallback;
};

/**
 * Validates email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
};
