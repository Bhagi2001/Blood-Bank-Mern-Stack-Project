import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { useTheme } from '../context/ThemeContext';


export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { locale, setLocale, t } = useLocale();
  const { theme, toggle } = useTheme();

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
            <NavLink to="/dashboard">{t('nav.dashboard')}</NavLink>
            <NavLink to="/inventory">{t('nav.inventory')}</NavLink>
            <NavLink to="/donors">{t('nav.donors')}</NavLink>
            <NavLink to="/hospitals">{t('nav.hospitals')}</NavLink>
            <NavLink to="/requests">{t('nav.requests')}</NavLink>
          </>
        )}
      </div>
      <div className="bb-nav__right">
        <div className="bb-lang">
          <button className={`bb-lang__btn ${locale === 'en' ? 'is-active' : ''}`} onClick={() => setLocale('en')}>EN</button>
          <button className={`bb-lang__btn ${locale === 'si' ? 'is-active' : ''}`} onClick={() => setLocale('si')}>සිං</button>
          <button className={`bb-lang__btn ${locale === 'ta' ? 'is-active' : ''}`} onClick={() => setLocale('ta')}>த</button>
        </div>
        <button
          title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          onClick={toggle}
          className="bb-btn bb-btn--ghost"
          style={{ padding: '6px 10px', marginRight: 6 }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {isAuthenticated ? (
          <>
            <span className="bb-user">{user?.name} ({user?.role})</span>
            <button className="bb-btn" onClick={logout}>{t('nav.logout')}</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="bb-btn bb-btn--ghost">{t('nav.login')}</NavLink>
            <NavLink to="/register" className="bb-btn">{t('nav.register')}</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
