import React, { useEffect, useState } from 'react';
import { orgService } from '../services/orgService';

export default function Hospitals() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provinceQuery, setProvinceQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('');

  useEffect(() => {
    orgService.listHospitals().then(setList).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="bb-page-center">Loading…</div>;

  const q = provinceQuery.trim().toLowerCase();
  const tq = typeQuery.trim().toLowerCase();
  let filtered = q ? list.filter(h => (h.province || '').toLowerCase().includes(q)) : list;
  if (tq) {
    if (tq === 'public') filtered = filtered.filter(h => ((h.type || '').toLowerCase().includes('public') || h.isPublic));
    else if (tq === 'private') filtered = filtered.filter(h => ((h.type || '').toLowerCase().includes('private') || h.isPublic === false));
  }

  return (
    <section>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
        <h2>Hospitals</h2>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <label style={{color:'#666'}}>Search province:</label>
          <input className="bb-search" value={provinceQuery} onChange={e => setProvinceQuery(e.target.value)} placeholder="e.g., Southern, Uva" />

          <label style={{display:'flex', gap:8, alignItems:'center'}}>
            Type:
            <select className="bb-select" value={typeQuery} onChange={e => setTypeQuery(e.target.value)}>
              <option value="">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
      </div>

      <div className="bb-table">
        <div className="bb-thead">
          <div>Hospital</div>
          <div>City</div>
          <div>Province</div>
          <div>Type</div>
          <div>Contact</div>
        </div>
        {filtered.map(h => (
          <div key={h.id} className="bb-trow">
            <div>{h.hospital}</div>
            <div>{h.city}</div>
            <div>{h.province}</div>
            <div>{h.type}</div>
            <div className="bb-right">{h.contact || '-'}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:8, color:'#666'}}>Showing {filtered.length} of {list.length} locations</div>
    </section>
  );
}
