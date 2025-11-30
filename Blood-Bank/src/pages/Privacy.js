import React from 'react';
import { useLocale } from '../context/LocaleContext';

export default function Privacy() {
  const { t } = useLocale();
  return (
    <section className="bb-main">
      <h2>{t('privacy.title')}</h2>
      <p className="bb-muted">{t('privacy.intro')}</p>

      <div style={{ marginTop: 12 }}>
        <h4>{t('privacy.title')}</h4>
        <p className="bb-muted">{t('privacy.intro')}</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Questions</h4>
        <p className="bb-muted">Contact us at <a href="mailto:privacy@bloodlink.lk">privacy@bloodlink.lk</a> for data access or removal requests.</p>
      </div>
    </section>
  );
}
