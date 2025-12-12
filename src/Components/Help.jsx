import { useEffect } from "react";
import { useTranslation } from "../i18n/useTranslation";

export default function Help({ onClose, githubUrl = "https://github.com" }) {
  const t = useTranslation();
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content" style={{ background: "#111827" }}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="modal__body">
          <h2 className="modal__title">{t('helpTitle')}</h2>
          <p className="modal__text">
            {t('helpDescription')}
          </p>
          <p className="modal__text">
            {t('helpRules')}
          </p>
          <ul style={{lineHeight: 1.6, paddingLeft: 18 }}>
            <li style={{color:"#ffff"}}>{t('helpBulls')}</li>
            <li style={{color:"#ffff"}}>{t('helpCows')}</li>
            <li style={{color:"#ffff"}}>{t('helpWin')}</li>
          </ul>
          <p className="modal__text">
            {t('helpStar')}
          </p>
          <div className="modal__actions">
            <a className="modal__btn modal__btn--secondary" href={githubUrl} target="_blank" rel="noopener noreferrer">
              {t('giveStar')} ⭐
            </a>
            <button className="modal__btn modal__btn--danger" onClick={onClose}>{t('close')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
