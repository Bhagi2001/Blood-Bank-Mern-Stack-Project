import { api, requestOrMock } from './api';
import { mockOrgs } from './mocks/mockOrgs';

export const orgService = {
  async listDonors() {
    const promise = api.get('/donors').then(r => r.data);
    return requestOrMock(promise, () => mockOrgs.listDonors());
  },
  async listHospitals() {
    const promise = api.get('/hospitals').then(r => r.data);
    return requestOrMock(promise, () => mockOrgs.listHospitals());
  },
};
