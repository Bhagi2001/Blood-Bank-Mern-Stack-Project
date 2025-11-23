import React, { useEffect, useState } from 'react';
import { orgService } from '../services/orgService';

export default function Donors() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provinceQuery, setProvinceQuery] = useState('');
  const [bloodGroupQuery, setBloodGroupQuery] = useState('');

  useEffect(() => {
    orgService.listDonors().then(setList).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="bb-page-center">Loading…</div>;

  const q = provinceQuery.trim().toLowerCase();
  const bq = bloodGroupQuery.trim().toLowerCase();
  let filtered = q ? list.filter(d => (d.province || '').toLowerCase().includes(q)) : list;
  if (bq) filtered = filtered.filter(d => (d.bloodType || '').toLowerCase().includes(bq));

  return (
    <section>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
        <h2>Donors</h2>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <label style={{display:'flex', gap:8, alignItems:'center'}}>
            Blood group:
            <select className="bb-select" value={bloodGroupQuery} onChange={e => setBloodGroupQuery(e.target.value)}>
              <option value="">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </label>

          <label style={{display:'flex', gap:8, alignItems:'center'}}>
            <span style={{color:'#666'}}>Search province:</span>
            <input className="bb-search" value={provinceQuery} onChange={e => setProvinceQuery(e.target.value)} placeholder="e.g., Western, Central" />
          </label>
        </div>
      </div>

      <div className="bb-table">
        <div className="bb-thead">
          <div>Name</div>
          <div>Blood Type</div>
          <div>Last Donation</div>
          <div>Province</div>
          <div>Contact</div>
        </div>
        {filtered.map(d => (
          <div key={d.id} className="bb-trow">
            <div>{d.name}</div>
            <div className="bb-center">{d.bloodType}</div>
            <div>{d.lastDonation || '-'}</div>
            <div>{d.province || '-'}</div>
            <div className="bb-right">{d.contact || '-'}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:8, color:'#666'}}>Showing {filtered.length} of {list.length} donors</div>
    </section>
  );
}
