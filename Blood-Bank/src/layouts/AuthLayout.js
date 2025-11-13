import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="bb-auth">
      <div className="bb-auth__card">
        <Outlet />
      </div>
    </div>
  );
}
