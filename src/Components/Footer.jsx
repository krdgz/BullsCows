import { useTranslation } from "../i18n/useTranslation";

export default function Footer() {
  const t = useTranslation();
  
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="#help" className="footer__link">{t('help')}</a>
        <a href="https://github.com/krdgz/BullsCows" target="_blank" rel="noopener noreferrer" className="footer__link">{t('github')}</a>
      </div>
      <p className="footer__copyright">{t('copyright')}</p>
    </footer>
  );
}
