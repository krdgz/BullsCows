import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";

export default function AttemptsList({ attempts = [], color }) {
  const t = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="attempts">
      <button
        type="button"
        className="attempts__toggle"
        onClick={() => setOpen((v) => !v)}
        style={{ background: color }}
      >
        {t('attempts')} {open ? "▲" : "▼"}
      </button>

      {open && (
        <div className="attempts__panel">
          {attempts.length === 0 ? (
            <p className="attempts__empty">{t('noAttempts')}</p>
          ) : (
            <ul className="attempts__list">
              {attempts.map((item) => (
                <li key={item.ts} className="attempts__item">
                  <div className="attempts__guess">{item.guess}</div>
                  <div className="attempts__result">
                    <span className="attempts__pill attempts__pill--bull">{t('bulls')}: {item.bulls}</span>
                    <span className="attempts__pill attempts__pill--cow">{t('cows')}: {item.cows}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
