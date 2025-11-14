import React, { useEffect, useState } from 'react';
import { orgService } from '../services/orgService';

export default function Donors() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orgService.listDonors().then(setList).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading…</div>;

  return (
    <section>
      <h2>Donors</h2>
      <div className="bb-table">
        <div className="bb-thead">
          <div>Name</div>
          <div>Blood Type</div>
          <div>Last Donation</div>
        </div>
        {list.map(d => (
          <div key={d.id} className="bb-trow">
            <div>{d.name}</div>
            <div>{d.bloodType}</div>
            <div>{d.lastDonation}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
