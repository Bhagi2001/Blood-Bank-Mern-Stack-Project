const donors = [
  { id: 'd1', name: 'Mr. Sunil Perera', bloodType: 'A+', lastDonation: '2025-10-11', province: 'Western', contact: '071-1234567' },
  { id: 'd2', name: 'Ms. Anjali Kumar', bloodType: 'O-', lastDonation: '2025-08-20', province: 'Central', contact: '072-2345678' },
  { id: 'd3', name: 'Mr. Ramesh Silva', bloodType: 'B+', lastDonation: '2025-09-15', province: 'Southern', contact: '073-3456789' },
];

const hospitals = [
  { id: 'h1', hospital: 'General Hospital', city: 'Colombo', province: 'Western', type: 'Public', contact: '011-1234567' },
  { id: 'h2', hospital: 'General Hospital', city: 'Kandy', province: 'Central', type: 'Public', contact: '081-7654321' },
  { id: 'h3', hospital: 'Nawaloka Hospital', city: 'Colombo', province: 'Western', type: 'Private', contact: '011-2345678' },
];

const requests = [
  { _id: 'r1', patientName: 'Amara Silva', bloodGroup: 'O+', units: 2, center: 'Colombo Blood Centre', status: 'pending', createdAt: new Date().toISOString() },
  { _id: 'r2', patientName: 'Kamal Perera', bloodGroup: 'A-', units: 1, center: 'Kandy Hospital', status: 'fulfilled', createdAt: new Date().toISOString() },
  { _id: 'r3', patientName: 'Nadeesha', bloodGroup: 'B+', units: 3, center: 'Galle General', status: 'pending', createdAt: new Date().toISOString() }
];

export const mockOrgs = {
  listDonors: async () => {
    await new Promise(r => setTimeout(r, 200));
    return donors;
  },
  listHospitals: async () => {
    await new Promise(r => setTimeout(r, 200));
    return hospitals;
  },
  // Requests mock
  listRequests: async () => {
    await new Promise(r => setTimeout(r, 180));
    // return in axios-like shape to match requestOrMock usage
    return { data: requests };
  },
  addRequest: async (payload) => {
    const newReq = { _id: `mock-${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
    requests.unshift(newReq);
    await new Promise(r => setTimeout(r, 120));
    return { data: newReq };
  }
};
