import React from 'react';
import { useAuth } from '../context/AuthContext';
import DonorDashboard from './dashboards/DonorDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import HospitalDashboard from './dashboards/HospitalDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  // user.role expected values: 'donor', 'admin', 'hospital'
  const role = user?.role;

  if (role === 'admin') return <AdminDashboard />;
  if (role === 'hospital') return <HospitalDashboard />;
  // default to donor view for other roles or unauthenticated users
  return <DonorDashboard />;
}
