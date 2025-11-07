import React from 'react';

export default function Select({ label, value, onChange, options = [], name, required }) {
  return (
    <label className="bb-field">
      <span>{label}</span>
      <select name={name} value={value} onChange={e => onChange(e.target.value)} required={required}>
        <option value="" disabled>Choose...</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
