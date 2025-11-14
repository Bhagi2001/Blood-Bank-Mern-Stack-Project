import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DonorDashboard() {
  const { user } = useAuth();

  return (
    <section>
      <h2>Welcome back, {user?.name ?? 'Donor'}</h2>
      <div className="bb-grid">
        <div className="bb-card">
          <h3>Your profile</h3>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
        <div className="bb-card">
          <h3>Next steps</h3>
          <ul>
            <li>Update your donation preferences</li>
            <li>View upcoming donation drives</li>
            <li>Manage your donation history</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
