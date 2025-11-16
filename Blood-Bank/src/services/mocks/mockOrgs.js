const donors = [
  { id: 'd1', name: 'John Doe', bloodType: 'A+', lastDonation: '2025-10-11' },
  { id: 'd2', name: 'Jane Smith', bloodType: 'O-', lastDonation: '2025-08-20' },
];

const hospitals = [
  { id: 'h1', name: 'City Hospital', city: 'Lagos' },
  { id: 'h2', name: 'General Hospital', city: 'Abuja' },
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
};
