import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';

const faqs = [
  { q: 'How do I request blood?', a: 'Go to Requests and fill the New Request form with patient details and required units.' },
  { q: 'How do I become a donor?', a: 'Register an account, then navigate to the Donors page to add your donor profile.' },
  { q: 'How is donor privacy handled?', a: 'Personal details are masked; only required contact points are shared with approved centers.' },
  { q: 'What does each blood group mean?', a: 'Blood groups indicate compatibility. Always consult medical staff before transfusion.' }
];

export default function Help() {
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const results = faqs.filter(f => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
  });

  return (
    <section className="bb-main">
      <h2>{t('help.title')}</h2>
      <p className="bb-muted">{t('help.searchPlaceholder')}</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input className="bb-search" placeholder={t('help.searchPlaceholder')} value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <div style={{ marginTop: 16 }}>
        {results.map((f, i) => (
          <div key={i} className="bb-card" style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700 }}>{f.q}</div>
            <div style={{ marginTop: 6 }} className="bb-muted">{f.a}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>{t('help.stillNeed')}</h4>
        <p className="bb-muted">{t('help.contactPrompt')}</p>
      </div>
    </section>
  );
}
