import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { inventoryService } from '../../services/inventoryService';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    inventoryService.stats().then(s => { if (mounted) setStats(s); }).finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="bb-page-center"><Loader /></div>;

  return (
    <section>
      <h2>Admin Overview</h2>
      <div className="bb-grid">
        <div className="bb-card">
          <div className="bb-stat">
            <span>Total Units</span>
            <strong>{stats?.totalUnits}</strong>
          </div>
        </div>
        <div className="bb-card">
          <div className="bb-stat">
            <span>Low Stock Groups</span>
            <strong>{stats?.lowGroups}</strong>
          </div>
        </div>
      </div>

      <h3>By Blood Group</h3>
      <div className="bb-grid bb-grid--3">
        {stats?.groups?.map(g => (
          <div key={g.id} className={`bb-card ${g.quantity <= 5 ? 'bb-card--warn' : ''}`}>
            <div className="bb-stat">
              <span>{g.type}</span>
              <strong>{g.quantity}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
