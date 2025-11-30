import React from 'react';
import { useLocale } from '../context/LocaleContext';

export default function Terms() {
  const { t } = useLocale();
  return (
    <section className="bb-main">
      <h2>{t('terms.title')}</h2>
      <p className="bb-muted">{t('terms.intro')}</p>

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
