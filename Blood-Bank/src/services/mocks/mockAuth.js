const demoUser = {
  id: 'u_1',
  name: 'Demo Admin',
  email: 'admin@demo.com',
  role: 'admin',
};

export const mockAuth = {
  login: async ({ email }) => {
    const role = email?.includes('hospital') ? 'hospital' : email?.includes('donor') ? 'donor' : 'admin';
    const user = { ...demoUser, name: role === 'admin' ? 'Demo Admin' : role === 'hospital' ? 'Demo Hospital' : 'Demo Donor', role, email };
    const token = 'mock-token-' + role;
    await new Promise(r => setTimeout(r, 400));
    return { user, token };
  },
  register: async (payload) => {
    const role = payload?.role || 'donor';
    const user = { id: 'u_2', name: payload.name || 'New User', email: payload.email, role };
    const token = 'mock-token-' + role;
    await new Promise(r => setTimeout(r, 500));
    return { user, token };
  },
};
