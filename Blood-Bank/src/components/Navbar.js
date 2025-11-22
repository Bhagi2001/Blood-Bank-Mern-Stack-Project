import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';


export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { locale, setLocale } = useLocale();

  return (
    <nav className="bb-nav bb-nav--frost">
      <div className="bb-nav__left">
        <Link to="/" className="bb-brand bb-logo">
          <span className="bb-logo__mark">
            <img src="/blood-drop.png" alt="BloodLink logo" width="24" height="24" />
          </span>
          <span className="bb-logo__text">BloodLink</span>
        </Link>

        {isAuthenticated && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/inventory">Inventory</NavLink>
            <NavLink to="/donors">Donors</NavLink>
            <NavLink to="/hospitals">Hospitals</NavLink>
            <NavLink to="/requests">Requests</NavLink>
          </>
        )}
      </div>
      <div className="bb-nav__right">
        <div className="bb-lang">
          <button className={`bb-lang__btn ${locale === 'en' ? 'is-active' : ''}`} onClick={() => setLocale('en')}>EN</button>
          <button className={`bb-lang__btn ${locale === 'si' ? 'is-active' : ''}`} onClick={() => setLocale('si')}>සිං</button>
          <button className={`bb-lang__btn ${locale === 'ta' ? 'is-active' : ''}`} onClick={() => setLocale('ta')}>த</button>
        </div>
        {isAuthenticated ? (
          <>
            <span className="bb-user">{user?.name} ({user?.role})</span>
            <button className="bb-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="bb-btn bb-btn--ghost">Login</NavLink>
            <NavLink to="/register" className="bb-btn">Get Started</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
