import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

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
