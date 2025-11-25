import React, { useEffect, useState } from 'react';
import { api, requestOrMock, config } from '../services/api';
import { mockOrgs } from '../services/mocks/mockOrgs';

export default function Requests() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patientName: '', bloodGroup: '', units: 1, center: '' });

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    setError(null);
    try {
      const res = await requestOrMock(api.get('/requests'), mockOrgs.listRequests);
      setList(res.data || []);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  }

  const filtered = list.filter(r => {
    if (statusFilter && r.status !== statusFilter) return false;
    if (bloodFilter && r.bloodGroup !== bloodFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!((r.patientName || '').toLowerCase().includes(q) || (r.center || '').toLowerCase().includes(q))) return false;
    }
    return true;
  });

  async function submitForm(e) {
    e.preventDefault();
    try {
      const payload = { ...form, status: 'pending' };
      const res = await requestOrMock(api.post('/requests', payload), () => mockOrgs.addRequest(payload));
      setList(prev => [res.data, ...prev]);
      setForm({ patientName: '', bloodGroup: '', units: 1, center: '' });
      setShowForm(false);
    } catch (err) {
      setError('Failed to submit request');
    }
  }

  return (
    <section className="bb-main">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Blood Requests</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="bb-search" placeholder="Search patient or center" value={query} onChange={e => setQuery(e.target.value)} />
          <select className="bb-select" value={bloodFilter} onChange={e => setBloodFilter(e.target.value)}>
            <option value="">All groups</option>
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          <select className="bb-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="bb-btn" onClick={() => setShowForm(s => !s)}>{showForm ? 'Close' : 'New Request'}</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={submitForm} className="bb-card" style={{ margin: '16px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="bb-field">
              <span>Patient Name</span>
              <input value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})} required />
            </div>
            <div className="bb-field">
              <span>Blood Group</span>
              <select value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})} required>
                <option value="">Select</option>
                <option>O+</option>
                <option>O-</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
            <div className="bb-field">
              <span>Units</span>
              <input type="number" min="1" value={form.units} onChange={e => setForm({...form, units: Number(e.target.value)})} required />
            </div>
            <div className="bb-field">
              <span>Center</span>
              <input value={form.center} onChange={e => setForm({...form, center: e.target.value})} required />
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="bb-btn" type="submit">Submit Request</button>
          </div>
        </form>
      )}

      <div style={{ marginTop: 12 }}>
        {loading && <div className="bb-loader" />}
        {error && <div className="bb-toast bb-toast--error">{error}</div>}

        <div className="bb-table" style={{ marginTop: 12 }}>
          <div className="bb-thead">
            <div>Patient</div>
            <div>Blood</div>
            <div>Units</div>
            <div>Center</div>
            <div>Status</div>
          </div>

          {filtered.map(r => (
            <div className="bb-trow" key={r._id} style={{ alignItems: 'center' }}>
              <div style={{ fontWeight: 700 }}>{r.patientName}</div>
              <div>{r.bloodGroup}</div>
              <div>{r.units}</div>
              <div>{r.center}</div>
              <div>
                <span style={{ padding: '6px 8px', borderRadius: 8, background: r.status === 'pending' ? '#fef3c7' : r.status === 'fulfilled' ? '#ecfdf5' : '#fee2e2', color: '#111' }}>{r.status}</span>
              </div>
            </div>
          ))}

          {!loading && filtered.length === 0 && (
            <div style={{ padding: 16 }} className="bb-muted">No requests found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
