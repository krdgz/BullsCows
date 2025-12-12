import { useState, useEffect } from 'react';
import { LanguageContext } from './LanguageContextDef';
import { getLanguage, setLanguage as saveLanguage } from './translations';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => getLanguage());

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
