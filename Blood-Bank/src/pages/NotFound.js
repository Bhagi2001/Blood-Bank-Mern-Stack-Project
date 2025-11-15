import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className="bb-btn" to="/">Go Home</Link>
    </section>
  );
}
