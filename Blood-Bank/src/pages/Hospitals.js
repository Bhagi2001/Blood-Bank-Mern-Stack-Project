import React, { useEffect, useState } from 'react';
import { orgService } from '../services/orgService';

export default function Hospitals() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provinceQuery, setProvinceQuery] = useState('');

  useEffect(() => {
    orgService.listHospitals().then(setList).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="bb-page-center">Loading…</div>;

  const q = provinceQuery.trim().toLowerCase();
  const filtered = q ? list.filter(h => (h.province || '').toLowerCase().includes(q)) : list;

  return (
    <section>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
        <h2>Hospitals</h2>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <label style={{color:'#666'}}>Search province:</label>
          <input className="bb-search" value={provinceQuery} onChange={e => setProvinceQuery(e.target.value)} placeholder="e.g., Southern, Uva" />
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
