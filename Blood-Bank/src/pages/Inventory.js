import React, { useEffect, useState } from 'react';
import TextInput from '../components/Form/TextInput';
import Select from '../components/Form/Select';
import { inventoryService } from '../services/inventoryService';
import { useToast } from '../components/Toast/ToastContext';

const BLOOD_TYPES = ['A+','A-','B+','B-','O+','O-','AB+','AB-'];

export default function Inventory() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [type, setType] = useState('');
  const [qty, setQty] = useState('');
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const data = await inventoryService.list();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const submitDonation = async (e) => {
    e.preventDefault();
    await inventoryService.addDonation({ type, quantity: Number(qty) });
    toast.push('Donation added', 'success');
    setType(''); setQty('');
    refresh();
  };
  const submitConsumption = async (e) => {
    e.preventDefault();
    await inventoryService.addConsumption({ type, quantity: Number(qty) });
    toast.push('Consumption recorded', 'success');
    setType(''); setQty('');
    refresh();
  };

  return (
    <section>
      <h2>Inventory</h2>

      <div className="bb-grid bb-grid--2">
        <div className="bb-card">
          <h3>Add Donation</h3>
          <form onSubmit={submitDonation} className="bb-form">
            <Select label="Blood Type" value={type} onChange={setType} options={BLOOD_TYPES.map(x => ({ value: x, label: x }))} required />
            <TextInput label="Quantity (units)" type="number" value={qty} onChange={setQty} required />
            <button className="bb-btn" type="submit">Add</button>
          </form>
        </div>

        <div className="bb-card">
          <h3>Record Consumption</h3>
          <form onSubmit={submitConsumption} className="bb-form">
            <Select label="Blood Type" value={type} onChange={setType} options={BLOOD_TYPES.map(x => ({ value: x, label: x }))} required />
            <TextInput label="Quantity (units)" type="number" value={qty} onChange={setQty} required />
            <button className="bb-btn bb-btn--warn" type="submit">Record</button>
          </form>
        </div>
      </div>

      <h3>Current Stock</h3>
      <div className="bb-grid bb-grid--4">
        {loading ? 'Loading…' : items.map(i => (
          <div key={i.id} className={`bb-card ${i.quantity <= 5 ? 'bb-card--warn' : ''}`}>
            <div className="bb-stat">
              <span>{i.type}</span>
              <strong>{i.quantity}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
