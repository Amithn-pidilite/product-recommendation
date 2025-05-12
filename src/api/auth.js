import { useMutation } from '@tanstack/react-query';
import { fetchApi } from './fetch';

// Login mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const data = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
  });
};

// Register mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const data = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return data;
    },
  });
};

// Logout mutation
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const data = await fetchApi('/auth/logout', {
        method: 'POST',
      });
      return data;
    },
    onSuccess: () => {
      localStorage.removeItem('token');
    },
  });
}; 