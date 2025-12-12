import { useTranslation } from "../i18n/useTranslation";

export default function SurrenderModal({ 
  onConfirm, 
  onCancel, 
  title,
  message,
  confirmText
}) {
  const t = useTranslation();
  
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onCancel} />
      <div className="modal__content modal__content--warning">
        <button className="modal__close" onClick={onCancel} aria-label="Cerrar">×</button>
        <div className="modal__body">
          <p className="modal__eyebrow">{t('areSure')}</p>
          <h2 className="modal__title">{title || t('surrenderQuestion')}</h2>
          <p className="modal__text">{message || t('surrenderMessage')}</p>
          <div className="modal__actions">
            <button className="modal__btn modal__btn--secondary" onClick={onCancel}>
              {t('cancel')}
            </button>
            <button className="modal__btn modal__btn--danger" onClick={onConfirm}>
              {confirmText || t('surrenderConfirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
