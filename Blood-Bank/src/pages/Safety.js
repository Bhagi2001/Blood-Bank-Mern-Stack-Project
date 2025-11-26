import React from 'react';

export default function Safety() {
  return (
    <section className="bb-main">
      <h2>Safety & Guidelines</h2>
      <p className="bb-muted">Your safety is our priority. Follow these guidelines before and after donation.</p>

      <ul className="bb-list" style={{ marginTop: 12 }}>
        <li>Ensure you meet the basic eligibility criteria (age, weight, health condition).</li>
        <li>Stay hydrated and eat a healthy meal before donating.</li>
        <li>Bring a valid ID and any relevant medical information.</li>
        <li>Inform staff of any medications or recent travel.</li>
        <li>After donation, rest for 15 minutes and avoid heavy lifting for 24 hours.</li>
        <li>If you feel unwell after donating, contact the center or seek medical attention.</li>
      </ul>

      <div style={{ marginTop: 16 }}>
        <h4>Reporting</h4>
        <p className="bb-muted">If you observe unsafe practices at a center, report immediately via the Contact page. Include as much detail as possible.</p>
      </div>
    </section>
  );
}
