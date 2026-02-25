const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://103.171.97.71/api/v1/admin';

/**
 * Generic API call handler
 * @param {Object} config - Configuration object
 * @param {string} config.endpoint - API endpoint (e.g., '/users', '/employees/123')
 * @param {string} config.method - HTTP method (GET, POST, PUT, DELETE, PATCH) - default: GET
 * @param {Object} config.payload - Request body data (optional)
 * @param {string} config.token - Authorization token (optional)
 * @param {Object} config.headers - Custom headers (optional)
 * @returns {Promise<Object>} Response data
 */
export const apiCall = async ({
  endpoint,
  method = 'GET',
  payload = null,
  token = null,
  headers = {},
}) => {
  try {
    // Get token from localStorage if not provided
    const authToken = token || localStorage.getItem('authToken');

    // Build headers
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add authorization header if token exists
    if (authToken) {
      defaultHeaders['Authorization'] = `Bearer ${authToken}`;
    }

    // Build fetch options
    const options = {
      method,
      headers: defaultHeaders,
    };

    // Add body for methods that support it
    if (payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(payload);
    }

    // Make the API call
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    // Handle response
    const data = await response.json();

    // Check if response is ok
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'An error occurred',
        data,
      };
    }

    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError) {
      return {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }

    // Handle API errors
    return {
      success: false,
      status: error.status || 500,
      error: error.message || 'An error occurred',
      data: error.data || null,
    };
  }
};

/**
 * GET request wrapper
 */
export const apiGet = (endpoint, token = null, headers = {}) => {
  return apiCall({ endpoint, method: 'GET', token, headers });
};

/**
 * POST request wrapper
 */
export const apiPost = (endpoint, payload = null, token = null, headers = {}) => {
  return apiCall({ endpoint, method: 'POST', payload, token, headers });
};

/**
 * PUT request wrapper
 */
export const apiPut = (endpoint, payload = null, token = null, headers = {}) => {
  return apiCall({ endpoint, method: 'PUT', payload, token, headers });
};

/**
 * DELETE request wrapper
 */
export const apiDelete = (endpoint, token = null, headers = {}) => {
  return apiCall({ endpoint, method: 'DELETE', token, headers });
};

/**
 * PATCH request wrapper
 */
export const apiPatch = (endpoint, payload = null, token = null, headers = {}) => {
  return apiCall({ endpoint, method: 'PATCH', payload, token, headers });
};
