// Centralized API service layer
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Get API URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL environment variable is not defined');
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token if exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 - unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - server may be down');
    }
    
    return Promise.reject(error);
  }
);

// Retry logic for failed requests
const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryRequest(requestFn, retries - 1, delay * 2);
  }
};

// ==================== BOOKING API ====================
export const bookingApi = {
  create: async (data: {
    name: string;
    email: string;
    phone: string;
    category: string;
    date: string;
    time: string;
    duration: string;
    notes?: string;
  }) => {
    const response = await retryRequest(() =>
      apiClient.post('/api/book', data)
    );
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/api/admin/bookings');
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/admin/bookings/${id}`);
    return response.data;
  },
};

// ==================== CONTACT API ====================
export const contactApi = {
  send: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const response = await retryRequest(() =>
      apiClient.post('/api/contact', data)
    );
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/api/admin/contacts');
    return response.data;
  },
};

// ==================== DONATION API ====================
export const donationApi = {
  create: async (data: { amount: number; email: string }) => {
    const response = await retryRequest(() =>
      apiClient.post('/api/donate', data)
    );
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/api/admin/donors');
    return response.data;
  },
};

// ==================== GALLERY API ====================
export const galleryApi = {
  getAll: async () => {
    const response = await apiClient.get('/api/admin/gallery');
    return response.data;
  },

  upload: async (formData: FormData) => {
    const response = await apiClient.post('/api/admin/gallery/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/api/admin/gallery/${id}`);
    return response.data;
  },
};

// ==================== AUTH API ====================
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/api/admin/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ==================== HEALTH CHECK ====================
export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    return null;
  }
};

// Export the base URL for image/video sources
export const getMediaUrl = (path: string) => {
  return `${API_BASE_URL}${path}`;
};

export default apiClient;
