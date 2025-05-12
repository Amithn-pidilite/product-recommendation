const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchApi = async (endpoint, options = {}) => {
  const url = `${baseURL}${endpoint}`;
  const headers = {
    ...defaultHeaders,
    ...getAuthHeader(),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    return handleResponse(response);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}; 