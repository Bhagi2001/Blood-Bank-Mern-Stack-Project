import React, { useEffect, useState } from 'react';
import { orgService } from '../services/orgService';

export default function Donors() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provinceQuery, setProvinceQuery] = useState('');

  useEffect(() => {
    orgService.listDonors().then(setList).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="bb-page-center">Loading…</div>;

  const q = provinceQuery.trim().toLowerCase();
  const filtered = q ? list.filter(d => (d.province || '').toLowerCase().includes(q)) : list;

  return (
    <section>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
        <h2>Donors</h2>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <label style={{color:'#666'}}>Search province:</label>
          <input className="bb-search" value={provinceQuery} onChange={e => setProvinceQuery(e.target.value)} placeholder="e.g., Western, Central" />
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
