import React, { useState } from 'react';
import TextInput from '../components/Form/TextInput';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('password');
  const { login, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      toast.push('Logged in', 'success');
      navigate('/dashboard');
    } catch (e) {
      toast.push('Login failed', 'error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="bb-form">
        <TextInput label="Email" value={email} onChange={setEmail} type="email" required />
        <TextInput label="Password" value={password} onChange={setPassword} type="password" required />
        <button className="bb-btn" disabled={loading} type="submit">{loading ? 'Signing in…' : 'Login'}</button>
      </form>
      <p className="bb-muted">No account? <Link to="/register">Register</Link></p>
      <p className="bb-muted">Tip: use emails like hospital@demo.com or donor@demo.com to switch roles in mock mode.</p>
    </div>
  );
}
