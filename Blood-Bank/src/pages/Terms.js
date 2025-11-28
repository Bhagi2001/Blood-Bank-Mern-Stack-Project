import React from 'react';

export default function Terms() {
  return (
    <section className="bb-main">
      <h2>Terms of Service</h2>
      <p className="bb-muted">By using BloodLink you agree to these terms. Our platform is provided to facilitate communication between donors, hospitals, and organizations; medical decisions should always be made by qualified professionals.</p>

      <div style={{ marginTop: 12 }}>
        <h4>Use of the platform</h4>
        <p className="bb-muted">Users must provide accurate information and not misuse contact details for unsolicited messages. Improper use may result in suspension.</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Liability</h4>
        <p className="bb-muted">BloodLink is not liable for outcomes of medical procedures or donations arranged through the platform. Always consult medical staff.</p>
      </div>
    </section>
  );
}
