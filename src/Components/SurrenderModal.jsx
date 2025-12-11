export default function SurrenderModal({ 
  onConfirm, 
  onCancel, 
  title = "¿Deseas rendirte?",
  message = "El juego se reiniciará y perderás tu progreso.",
  confirmText = "Rendirse"
}) {
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onCancel} />
      <div className="modal__content modal__content--warning">
        <button className="modal__close" onClick={onCancel} aria-label="Cerrar">×</button>
        <div className="modal__body">
          <p className="modal__eyebrow">¿Estás seguro?</p>
          <h2 className="modal__title">{title}</h2>
          <p className="modal__text">{message}</p>
          <div className="modal__actions">
            <button className="modal__btn modal__btn--secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button className="modal__btn modal__btn--danger" onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
