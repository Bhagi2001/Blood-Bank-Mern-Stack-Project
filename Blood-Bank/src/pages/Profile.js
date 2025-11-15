import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <section>
      <h2>Profile</h2>
      <pre className="bb-pre">{JSON.stringify(user, null, 2)}</pre>
    </section>
  );
}
