let inventory = [
  { id: 'i1', type: 'A+', quantity: 10, lastUpdated: Date.now() - 86400000 },
  { id: 'i2', type: 'O-', quantity: 6, lastUpdated: Date.now() - 3600000 },
  { id: 'i3', type: 'B+', quantity: 3, lastUpdated: Date.now() - 7200000 },
];

export const mockInventory = {
  list: async () => {
    await new Promise(r => setTimeout(r, 250));
    return [...inventory];
  },
  addDonation: async ({ type, quantity }) => {
    await new Promise(r => setTimeout(r, 200));
    const found = inventory.find(i => i.type === type);
    if (found) found.quantity += Number(quantity || 0);
    else inventory.push({ id: 'i' + (inventory.length + 1), type, quantity: Number(quantity || 0), lastUpdated: Date.now() });
    return { success: true };
  },
  addConsumption: async ({ type, quantity }) => {
    await new Promise(r => setTimeout(r, 200));
    const found = inventory.find(i => i.type === type);
    if (found) found.quantity = Math.max(0, found.quantity - Number(quantity || 0));
    return { success: true };
  },
  stats: async () => {
    await new Promise(r => setTimeout(r, 180));
    const totalUnits = inventory.reduce((a, b) => a + b.quantity, 0);
    const low = inventory.filter(i => i.quantity <= 5).length;
    return { totalUnits, groups: inventory, lowGroups: low };
  },
};
