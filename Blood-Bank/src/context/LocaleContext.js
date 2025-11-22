import React, { createContext, useContext, useState } from 'react';

const LocaleContext = createContext({ locale: 'en', setLocale: () => {} });

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en');
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export default useLocale;
