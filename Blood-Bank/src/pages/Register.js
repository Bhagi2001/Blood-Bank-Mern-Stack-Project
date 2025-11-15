import React, { useState } from 'react';
import TextInput from '../components/Form/TextInput';
import Select from '../components/Form/Select';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const { register, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password, role });
      toast.push('Registered', 'success');
      navigate('/dashboard');
    } catch (e) {
      toast.push('Registration failed', 'error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit} className="bb-form">
        <TextInput label="Full Name" value={name} onChange={setName} required />
        <TextInput label="Email" value={email} onChange={setEmail} type="email" required />
        <TextInput label="Password" value={password} onChange={setPassword} type="password" required />
        <Select label="Role" value={role} onChange={setRole} options={[
          { value: 'admin', label: 'Admin' },
          { value: 'hospital', label: 'Hospital' },
          { value: 'donor', label: 'Donor' },
        ]} />
        <button className="bb-btn" disabled={loading} type="submit">{loading ? 'Creating…' : 'Create account'}</button>
      </form>
      <p className="bb-muted">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
