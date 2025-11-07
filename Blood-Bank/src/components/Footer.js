import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bb-footer">
      <div className="bb-footer__top">
        <div className="bb-footer__brand">
          <div className="bb-logo"> 
          <span className="bb-logo__mark">
            <img src="/blood-drop.png" alt="BloodLink logo" width="24" height="24" />
          </span> <span className="bb-footer__text">BloodLink</span></div>
          <p className="bb-muted">Connecting donors, hospitals, and organizations to save lives.</p>
        </div>
        <div className="bb-footer__cols">
          <div>
            <div className="bb-footer__title">Quick Links</div>
            <Link to="/" className="bb-footer__link">Home</Link>
            <Link to="/donors" className="bb-footer__link">Donors</Link>
            <Link to="/hospitals" className="bb-footer__link">Hospitals</Link>
          </div>
          <div>
            <div className="bb-footer__title">Support</div>
            <Link to="/help" className="bb-footer__link">Help Center</Link>
            <Link to="/safety" className="bb-footer__link">Safety</Link>
            <Link to="/contact" className="bb-footer__link">Contact</Link>
          </div>
          <div>
            <div className="bb-footer__title">Legal</div>
            <Link to="/privacy" className="bb-footer__link">Privacy</Link>
            <Link to="/terms" className="bb-footer__link">Terms</Link>
            <Link to="/cookies" className="bb-footer__link">Cookies</Link>
          </div>
        </div>
      </div>
      <div className="bb-footer__bottom">© {new Date().getFullYear()} BloodLink. All rights reserved.</div>
    </footer>
  );
}
