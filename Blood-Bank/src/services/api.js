import axios from 'axios';

const USE_MOCKS = (process.env.REACT_APP_USE_MOCKS || 'true') === 'true';
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token if provided
export function attachAuthToken(token) {
  api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;
}

// Graceful mock fallback wrapper
export async function requestOrMock(promise, mockFn) {
  if (!USE_MOCKS) return promise;
  try {
    return await promise;
  } catch (e) {
    // Fallback to mock in dev/demo
    return mockFn();
  }
}

export const config = { USE_MOCKS, BASE_URL };
