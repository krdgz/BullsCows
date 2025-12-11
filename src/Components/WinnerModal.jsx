import { useEffect } from "react";

export default function WinnerModal({ player, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!player) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content" style={{ background: player.color }}>
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="modal__body">
          <p className="modal__eyebrow">¡Felicidades!</p>
          <h2 className="modal__title">{player.name || `Jugador`} ha ganado</h2>
        </div>
      </div>
    </div>
  );
}
