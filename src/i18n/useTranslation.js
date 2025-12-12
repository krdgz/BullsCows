import { useContext } from 'react';
import { LanguageContext } from './LanguageContextDef';
import { t } from './translations';

export function useTranslation() {
  const { language } = useContext(LanguageContext);
  
  return (key) => t(language, key);
}
