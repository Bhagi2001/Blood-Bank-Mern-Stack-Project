import React from 'react';

export default function Privacy() {
  return (
    <section className="bb-main">
      <h2>Privacy Policy</h2>
      <p className="bb-muted">BloodLink is committed to protecting donor and user privacy. We collect only the information necessary to connect donors, hospitals, and organizations, and we mask or anonymize personal identifiers where appropriate.</p>

      <div style={{ marginTop: 12 }}>
        <h4>What we collect</h4>
        <p className="bb-muted">Basic contact details, blood group, location (province/district), and donation history to facilitate safe blood matching and logistics.</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>How we protect data</h4>
        <p className="bb-muted">We never display full personal identifiers publicly. Sensitive data is only shared with authorized medical centers and verified personnel.</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Questions</h4>
        <p className="bb-muted">Contact us at <a href="mailto:privacy@bloodlink.lk">privacy@bloodlink.lk</a> for data access or removal requests.</p>
      </div>
    </section>
  );
}
