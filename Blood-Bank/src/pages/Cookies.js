import React from 'react';
import { useLocale } from '../context/LocaleContext';

export default function Cookies() {
  const { t } = useLocale();
  return (
    <section className="bb-main">
      <h2>{t('cookies.title')}</h2>
      <p className="bb-muted">{t('cookies.intro')}</p>

      <div style={{ marginTop: 12 }}>
        <h4>Types of cookies</h4>
        <p className="bb-muted">Session cookies, persistent cookies for preferences, and analytics cookies to help us improve the service.</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <h4>Managing cookies</h4>
        <p className="bb-muted">You can manage cookie preferences in your browser settings. Disabling some cookies may affect site functionality.</p>
      </div>
    </section>
  );
}
