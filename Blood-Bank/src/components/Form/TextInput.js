import React from 'react';

export default function TextInput({ label, type = 'text', value, onChange, placeholder, required, name }) {
  return (
    <label className="bb-field">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
