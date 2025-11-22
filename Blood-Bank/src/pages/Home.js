import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';

const TRANSLATIONS = {
  en: {
    title: ['Save a Life', 'Today, Donate', 'Blood'],
    lead: 'Join our community of donors and organizations helping ensure safe and timely access to blood. Every donation can save up to three lives.',
    become: 'Become a Donor',
    request: 'Request Blood',
    secure: 'Secure, privacy-first platform',
    stats: ['Units Donated', 'Registered Donors', 'Emergency Support', 'Traceable Inventory'],
    whyTitle: 'Why Your Blood Donation Matters',
    howTitle: 'How BloodLink Works',
    steps: ['Register as Donor', 'Find Donation Drives', 'Save Lives'],
    ctaTitle: 'Your Immediate Action Can Change a Life.',
    pledge: 'Pledge to Donate'
  },
  si: {
    title: ['ජීවිතයක් රැකගන්න', 'අද රුධිර දානය කරන්න', ''],
    lead: 'රුධිරයට ආරක්ෂිත සහ වේලාවට ගැලපෙන ප්‍රවේශයක් සපයන දායකයින් සහ සංවිධාන සමූහයට එකතුවන්න. සෑම දානයක්ම ත්‍රිදේහයක් දක්වා ජීවිතයන් බේරා ගත හැක.',
    become: 'දායකයෙක් වන්න',
    request: 'රුධිර ඉල්ලීම',
    secure: 'සුරක්ෂිත, පෞද්ගලිකත්ව-ප්‍රමුඛ වේදිකාව',
    stats: ['දාන කළ ඒකක', 'ලියාපදිංචි දායකයන්', '24/7 හදිසි සහය', 'සංවිධාන කාර්ය සාධනය'],
    whyTitle: 'ඔබේ රුධිර දාන කිරීම ඇයි වැදගත්ද',
    howTitle: 'BloodLink ක්‍රියාකාරීත්වය',
    steps: ['දායකයෙකු ලෙස ලියාපදිංචි වන්න', 'දාන වැඩසටහන් සොයන්න', 'ජීවිත බේරා ගන්න'],
    ctaTitle: 'ඔබේ වහාම ක්‍රියාකාරිත්වය ජීවිතයක් වෙනස් කළ හැක.',
    pledge: 'දානයට ඔරොත්තු වන්න'
  },
  ta: {
    title: ['ஒரு உயிரை காப்பாற்றுங்கள்', 'இன்று இரத்தம் தானம் செய்யவும்', ''],
    lead: 'இரத்தத்திற்கு பாதுகாப்பான மற்றும் நேர்த்தியான அணுகலை உறுதி செய்ய உதவும் தானிகளும் அமைப்புகளும் உள்ள சமூகத்தில் சேரவும். ஒவ்வொரு தானமும் பல உயிர்களை காப்பாற்றலாம்.',
    become: 'தானியாளர் ஆகவும்',
    request: 'இரத்தம் கோருங்கள்',
    secure: 'பாதுகாப்பான, தனியுரிமை முன்னுரிமை வலைமொழி',
    stats: ['தானிக்கப்பட்ட அலகுகள்', 'பதிவுசெய்த தானியாளர்கள்', '24/7 அவசர ஆதரவு', 'காணப்படும் சரக்குகள்'],
    whyTitle: 'உங்கள் இரத்தத் தானம் ஏன் முக்கியம்',
    howTitle: 'BloodLink எப்படி செயல்படுகிறது',
    steps: ['தானியாளராக பதிவு செய்க', 'தான நிகழ்ச்சிகளை கண்டறிக', 'வாழ்க்கைகளை காப்பாற்று'],
    ctaTitle: 'உங்கள் உடனடி நடவடிக்கை ஒரு உயிரை மாற்றக்கூடும்.',
    pledge: 'தானம் உறுதிபடுத்துங்கள்'
  }
};

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { locale } = useLocale();
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const slides = [
    {
      src: require('../assets/images/Blood group.png'),
      alt: 'Blood group',
    },
    {
      src: require('../assets/images/Nurse preparing blood donation.jpg'),
      alt: 'Nurse preparing blood donation',
    },
    {
      src: require('../assets/images/Medical equipment in clinic.jpg'),
      alt: 'Medical equipment in clinic',
    },
    {
      src: require('../assets/images/Hospital staff collaborating.jpg'),
      alt: 'Hospital staff collaborating',
    },
    {
      src: require('../assets/images/Blood bag stored in a rack.jpg'),
      alt: 'Blood bag stored in a rack',
    },
    {
      src: require('../assets/images/Thankful for blood donation.png'),
      alt: 'Thankful for blood donation',
    },
  ];
  const count = slides.length;
  const extended = [slides[count - 1], ...slides, slides[0]]; // clone ends for seamless loop
  // current index on extended array; start at 1 (first real slide)
  const [current, setCurrent] = useState(1);
  const [animating, setAnimating] = useState(true);
  const activeDot = (current - 1 + count) % count; // 0..count-1

  const prev = () => { setAnimating(true); setCurrent(i => i - 1); };
  const next = () => { setAnimating(true); setCurrent(i => i + 1); };
  // autoplay
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setAnimating(true);
      setCurrent(i => i + 1);
    }, 3000);
    return () => clearInterval(id);
  }, [paused, count]);
  // after animation completes, snap when at clones to maintain constant speed (no long jump)
  const onTransitionEnd = () => {
    if (current === count + 1) { // passed the cloned first
      setAnimating(false);
      setCurrent(1); // snap to first real
    } else if (current === 0) { // moved to cloned last
      setAnimating(false);
      setCurrent(count); // snap to last real
    }
  };
  // simple touch support
  const [touchStartX, setTouchStartX] = useState(null);
  const onTouchStart = (e) => setTouchStartX(e.touches?.[0]?.clientX ?? 0);
  const onTouchEnd = (e) => {
    if (touchStartX == null) return;
    const endX = e.changedTouches?.[0]?.clientX ?? 0;
    const dx = endX - touchStartX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    setTouchStartX(null);
  };
  return (
    <div className="bb-landing">
      {/* Hero */}
      <section className="bb-hero">
        <div className="bb-hero__content">
          <h1>
            {t.title[0]}<br />{t.title[1]}{t.title[2] ? <><br />{t.title[2]}</> : null}
          </h1>
          <p className="bb-muted">{t.lead}</p>
          <div className="bb-actions">
            {isAuthenticated ? (
              <Link className="bb-btn" to="/dashboard">Go to Dashboard</Link>
            ) : (
              <>
                <Link className="bb-btn" to="/register">{t.become}</Link>
                <Link className="bb-btn bb-btn--ghost" to="/login">{t.request}</Link>
              </>
            )}
          </div>
          <div className="bb-hero__meta bb-muted">{t.secure}</div>
        </div>
          <div className="bb-hero__media">
            <div className="bb-slider" aria-label="Donation images slider" role="region">
              <button className="bb-slider__btn bb-slider__btn--prev" aria-label="Previous slide" onClick={prev}>‹</button>
              <div
                className="bb-slider__viewport"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); }}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div
                  className="bb-slider__track"
                  style={{ transform: `translateX(-${current * 100}%)`, transition: animating ? 'transform 450ms ease' : 'none' }}
                  onTransitionEnd={onTransitionEnd}
                >
                  {extended.map((s, idx) => (
                    <div className="bb-slide" key={idx} aria-hidden={idx !== current}>
                      <img src={s.src} alt={s.alt} loading={idx === 1 ? 'eager' : 'lazy'} />
                    </div>
                  ))}
                </div>
              </div>
              <button className="bb-slider__btn bb-slider__btn--next" aria-label="Next slide" onClick={next}>›</button>

              <div className="bb-dots" role="tablist" aria-label="Slides pagination">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`bb-dot ${idx === activeDot ? 'is-active' : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={idx === activeDot ? 'true' : undefined}
                    onClick={() => { setAnimating(true); setCurrent(idx + 1); }}
                  />
                ))}
              </div>
            </div>
          </div>
          </section>

      {/* Stats */}
      <section className="bb-stats">
        <div className="bb-statcard">
          <div className="bb-statcard__value">1.2M+</div>
          <div className="bb-statcard__label">Units Donated</div>
        </div>
        <div className="bb-statcard">
          <div className="bb-statcard__value">50K+</div>
          <div className="bb-statcard__label">Registered Donors</div>
        </div>
        <div className="bb-statcard">
          <div className="bb-statcard__value">24/7</div>
          <div className="bb-statcard__label">Emergency Support</div>
        </div>
        <div className="bb-statcard">
          <div className="bb-statcard__value">100%</div>
          <div className="bb-statcard__label">Traceable Inventory</div>
        </div>
      </section>

      {/* Why donate */}
      <section className="bb-section bb-section--alt">
        <div className="bb-section__media">
          <img
            src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=1200&auto=format&fit=crop"
            alt="Handshake between donor and nurse"
          />
        </div>
        <div className="bb-section__content">
          <h2>Why Your Blood Donation Matters</h2>
          <p className="bb-muted">
            Donated blood is used for surgeries, cancer treatment, chronic
            illnesses, and traumatic injuries. Our platform connects donors to
            hospitals and organizations, ensuring every drop reaches those in need.
          </p>
          <ul className="bb-list">
            <li>Streamlined scheduling and reminders</li>
            <li>Smart matching by blood group and location</li>
            <li>Transparent inventory and request tracking</li>
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="bb-steps">
        <h2>How BloodLink Works</h2>
        <div className="bb-grid bb-grid--3">
          <div className="bb-card bb-step">
            <div className="bb-step__icon">🩸</div>
            <h3>Register as Donor</h3>
            <p className="bb-muted">Create your profile and set your donation preferences.</p>
          </div>
          <div className="bb-card bb-step">
            <div className="bb-step__icon">🏥</div>
            <h3>Find Donation Drives</h3>
            <p className="bb-muted">Hospitals and NGOs post verified blood requests and drives.</p>
          </div>
          <div className="bb-card bb-step">
            <div className="bb-step__icon">✅</div>
            <h3>Save Lives</h3>
            <p className="bb-muted">Donate safely and track your impact on your dashboard.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bb-cta">
        <h2>Your Immediate Action Can Change a Life.</h2>
        <div className="bb-actions">
          <Link className="bb-btn" to={isAuthenticated ? '/dashboard' : '/register'}>
            {isAuthenticated ? 'Open Dashboard' : 'Pledge to Donate'}
          </Link>
          <Link className="bb-btn bb-btn--ghost" to="/requests">Request Blood</Link>
        </div>
      </section>
    </div>
  );
}
