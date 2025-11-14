import React, { useEffect, useState } from 'react';
import { orgService } from '../services/orgService';

export default function Hospitals() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orgService.listHospitals().then(setList).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;

  return (
    <section>
      <h2>Hospitals</h2>
      <div className="bb-table">
        <div className="bb-thead">
          <div>Name</div>
          <div>City</div>
        </div>
        {list.map(h => (
          <div key={h.id} className="bb-trow">
            <div>{h.name}</div>
            <div>{h.city}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
