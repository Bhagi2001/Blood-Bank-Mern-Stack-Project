import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="bb-footer">
      <div className="bb-footer__top">
        <div className="bb-footer__brand">
          <div className="bb-logo"> 
          <span className="bb-logo__mark">
            <img src="/blood-drop.png" alt="BloodLink logo" width="24" height="24" />
          </span> <span className="bb-footer__text">BloodLink</span></div>
          <p className="bb-muted">Connecting donors, hospitals, and organizations across Sri Lanka to save lives.</p>
          <p className="bb-contact">Contact: +94 11 123 4567 · Email: info@bloodlink.lk</p>
        </div>
        <div className="bb-footer__cols">
          <div>
            <div className="bb-footer__title">{t('footer.quickLinks')}</div>
            <Link to="/" className="bb-footer__link">{t('nav.home')}</Link>
            <Link to="/donors" className="bb-footer__link">{t('nav.donors')}</Link>
            <Link to="/hospitals" className="bb-footer__link">{t('nav.hospitals')}</Link>
          </div>
          <div>
            <div className="bb-footer__title">{t('footer.support')}</div>
            <Link to="/help" className="bb-footer__link">{t('help.title')}</Link>
            <Link to="/safety" className="bb-footer__link">{t('help.title')}</Link>
            <Link to="/contact" className="bb-footer__link">{t('footer.contact')}</Link>
          </div>
          <div>
            <div className="bb-footer__title">{t('footer.legal')}</div>
            <Link to="/privacy" className="bb-footer__link">{t('privacy.title')}</Link>
            <Link to="/terms" className="bb-footer__link">{t('terms.title')}</Link>
            <Link to="/cookies" className="bb-footer__link">{t('cookies.title')}</Link>
          </div>
        </div>
      </div>
      <div className="bb-footer__bottom">© {new Date().getFullYear()} BloodLink. All rights reserved.</div>
    </footer>
  );
}
