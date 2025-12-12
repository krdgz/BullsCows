import { useContext } from 'react';
import { LanguageContext } from '../i18n/LanguageContextDef';
import { languages } from '../i18n/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div className="language-switcher">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          className={`language-switcher__btn ${language === code ? 'language-switcher__btn--active' : ''}`}
          onClick={() => setLanguage(code)}
          title={label}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
