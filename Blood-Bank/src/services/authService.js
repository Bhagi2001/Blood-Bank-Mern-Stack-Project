import { api, attachAuthToken, requestOrMock } from './api';
import { mockAuth } from './mocks/mockAuth';

export const authService = {
  async login({ email, password }) {
    const promise = api.post('/auth/login', { email, password }).then(r => r.data);
    const data = await requestOrMock(promise, () => mockAuth.login({ email, password }));
    attachAuthToken(data.token);
    return data;
  },
  async register(payload) {
    const promise = api.post('/auth/register', payload).then(r => r.data);
    const data = await requestOrMock(promise, () => mockAuth.register(payload));
    attachAuthToken(data.token);
    return data;
  },
  logout() {
    attachAuthToken(null);
  },
};
