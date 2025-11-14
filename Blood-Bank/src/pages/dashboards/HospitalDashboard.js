import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { inventoryService } from '../../services/inventoryService';

export default function HospitalDashboard() {
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
      <h2>Hospital Dashboard</h2>
      <p className="bb-muted">View inventory levels and request blood for your facility.</p>

      <div className="bb-grid">
        <div className="bb-card">
          <div className="bb-stat">
            <span>Total Units</span>
            <strong>{stats?.totalUnits}</strong>
          </div>
        </div>
        <div className="bb-card">
          <div className="bb-stat">
            <span>Critical Groups</span>
            <strong>{stats?.lowGroups}</strong>
          </div>
        </div>
      </div>

      <h3>Request blood</h3>
      <div className="bb-card">
        <p>Use the Requests page to create verified requests for your hospital. Your requests will be matched to nearby donors and organizations.</p>
      </div>
    </section>
  );
}
