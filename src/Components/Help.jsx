import { useEffect } from "react";

export default function Help({ onClose, githubUrl = "https://github.com" }) {
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
          <h2 className="modal__title">Ayuda</h2>
          <p className="modal__text">
            Toros y Vacas es un juego de lógica. Cada jugador define un número secreto de 4 dígitos.
            En tu turno, intenta adivinar el número del oponente: "Toros" son dígitos correctos en posición correcta; "Vacas" son dígitos correctos pero en posición distinta.
          </p>
          <p className="modal__text">
            Reglas rápidas:
          </p>
          <ul style={{lineHeight: 1.6, paddingLeft: 18 }}>
            <li style={{color:"#ffff"}}>Usa sólo dígitos (0-9) y máximo 4 cifras por intento.</li>
            <li style={{color:"#ffff"}}>Tras "Adivinar", verás los toros y vacas de ese intento.</li>
            <li style={{color:"#ffff"}}>Ganas con 4 toros. Puedes rendirte desde la cinta superior.</li>
          </ul>
          <p className="modal__text">
            Si este proyecto te es útil, apóyame con una estrella en GitHub.
          </p>
          <div className="modal__actions">
            <a className="modal__btn modal__btn--secondary" href={githubUrl} target="_blank" rel="noopener noreferrer">
              Dar estrella ⭐
            </a>
            <button className="modal__btn modal__btn--danger" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
