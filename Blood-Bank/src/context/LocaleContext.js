import React, { createContext, useContext, useState, useMemo } from 'react';
import translations from '../i18n/translations';

const LocaleContext = createContext({ locale: 'en', setLocale: () => {}, t: (k) => k });

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en');

  const t = useMemo(() => {
    return (key, fallback) => {
      try {
        const parts = key.split('.');
        let cur = translations[locale] || translations.en;
        for (const p of parts) {
          if (cur[p] === undefined) return fallback ?? key;
          cur = cur[p];
        }
        return cur;
      } catch (e) {
        return fallback ?? key;
      }
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export default useLocale;
