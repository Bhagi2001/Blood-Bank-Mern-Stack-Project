import { api, requestOrMock } from './api';
import { mockInventory } from './mocks/mockInventory';

export const inventoryService = {
  async list() {
    const promise = api.get('/inventory').then(r => r.data);
    return requestOrMock(promise, () => mockInventory.list());
  },
  async addDonation(payload) {
    const promise = api.post('/inventory/donations', payload).then(r => r.data);
    return requestOrMock(promise, () => mockInventory.addDonation(payload));
  },
  async addConsumption(payload) {
    const promise = api.post('/inventory/consumptions', payload).then(r => r.data);
    return requestOrMock(promise, () => mockInventory.addConsumption(payload));
  },
  async stats() {
    const promise = api.get('/inventory/stats').then(r => r.data);
    return requestOrMock(promise, () => mockInventory.stats());
  },
};
