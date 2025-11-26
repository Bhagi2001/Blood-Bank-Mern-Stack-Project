import React, { useState } from 'react';
import { api, requestOrMock } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await requestOrMock(api.post('/support/contact', form), async () => {
        await new Promise(r => setTimeout(r, 240));
        return { data: { id: `contact-${Date.now()}`, ...form } };
      });
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <section className="bb-main">
      <h2>Contact Support</h2>
      <p className="bb-muted">Use this form for general enquiries, reporting, or safety concerns.</p>

      <form onSubmit={submit} className="bb-card" style={{ marginTop: 12 }}>
        <div className="bb-field">
          <span>Your name</span>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="bb-field">
          <span>Email</span>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="bb-field">
          <span>Subject</span>
          <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
        </div>
        <div className="bb-field">
          <span>Message</span>
          <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
        </div>

        <div className="bb-actions" style={{ marginTop: 10 }}>
          <button className="bb-btn" type="submit">Send</button>
          {status === 'sending' && <div className="bb-loader bb-loader--sm" />}
          {status === 'sent' && <div className="bb-toast bb-toast--success">Sent</div>}
          {status === 'error' && <div className="bb-toast bb-toast--error">Failed to send</div>}
        </div>
      </form>
    </section>
  );
}
