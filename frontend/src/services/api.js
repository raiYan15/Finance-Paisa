import axios from 'axios';

const configuredApiOrigin = (import.meta.env.VITE_API_ORIGIN || '').trim();
const normalizedApiOrigin = configuredApiOrigin.replace(/\/+$/, '');
const apiBaseURL = normalizedApiOrigin ? `${normalizedApiOrigin}/api` : '/api';

const API = axios.create({
  baseURL: apiBaseURL,
  headers: { 'Content-Type': 'application/json' }
});

const PUBLIC_ENDPOINT_PATTERNS = [
  /^\/auth\/login$/,
  /^\/auth\/register$/,
  /^\/auth\/verify-otp$/,
  /^\/auth\/resend-otp$/,
  /^\/loans(?:\/.*)?$/,
  /^\/partner\/apply$/,
  /^\/contact$/,
  /^\/health$/,
];

const isPublicEndpoint = (url = '') => {
  const cleanUrl = url.replace(/^https?:\/\/[^/]+/i, '');
  const relativePath = cleanUrl.startsWith('/api') ? cleanUrl.slice(4) : cleanUrl;
  return PUBLIC_ENDPOINT_PATTERNS.some((pattern) => pattern.test(relativePath));
};

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('fp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle token expiry / 401 redirects
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';
    const hadToken = !!localStorage.getItem('fp_token');

    if (status === 401 && hadToken && !isPublicEndpoint(requestUrl)) {
      localStorage.removeItem('fp_token');
      localStorage.removeItem('fp_user');

      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth ─────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  verifyOtp: (data) => API.post('/auth/verify-otp', data),
  login: (data) => API.post('/auth/login', data),
  me: () => API.get('/auth/me'),
  resendOtp: (data) => API.post('/auth/resend-otp', data),
};

// ─── Loans ────────────────────────────────────────────────────────────────
export const loanAPI = {
  getAll: (params) => API.get('/loans', { params }),
  getById: (id) => API.get(`/loans/${id}`),
  checkEligibility: (data) => API.post('/loans/check-eligibility', data),
  apply: (data) => API.post('/loans/apply', data),
};

// ─── Applications ────────────────────────────────────────────────────────
export const applicationAPI = {
  getAll: (params) => API.get('/applications', { params }),
  getById: (id) => API.get(`/applications/${id}`),
};

// ─── Users ───────────────────────────────────────────────────────────────
export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.patch('/users/profile', data),
  changePassword: (data) => API.patch('/users/change-password', data),
};

// ─── Admin ───────────────────────────────────────────────────────────────
export const adminAPI = {
  getDashboard: () => API.get('/admin/dashboard'),
  getUsers: (params) => API.get('/admin/users', { params }),
  getApplications: (params) => API.get('/admin/applications', { params }),
  updateApplication: (id, data) => API.patch(`/admin/applications/${id}`, data),
  createLoan: (data) => API.post('/admin/loans', data),
  updateLoan: (id, data) => API.patch(`/admin/loans/${id}`, data),
};

// ─── Upload ──────────────────────────────────────────────────────────────
export const uploadAPI = {
  upload: (formData) => API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getMyDocuments: () => API.get('/upload/my-documents'),
};

// ─── Partner ─────────────────────────────────────────────────────────────
export const partnerAPI = {
  apply: (data) => API.post('/partner/apply', data),
};

// ─── Contact ─────────────────────────────────────────────────────────────
export const contactAPI = {
  create: (data) => API.post('/contact', data),
};

export default API;
