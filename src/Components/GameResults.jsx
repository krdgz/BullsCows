import { useState } from "react";
import AttemptsList from "./AttemptsList";
import SurrenderModal from "./SurrenderModal";

export default function GameResults({ player1, player2, attempts, onNewGame }) {
  const [showPlayer1Secret, setShowPlayer1Secret] = useState(false);
  const [showPlayer2Secret, setShowPlayer2Secret] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [showNewGameModal, setShowNewGameModal] = useState(false);

  const activeAttempts = attempts[activeTab] || [];

  const handleNewGame = () => {
    setShowNewGameModal(false);
    onNewGame?.();
  };

  return (
    <>
      <div className="results">
        <h2 className="results__title">Resultados del Juego</h2>

        <div className="results__secrets">
          <div className="results__secret-item">
            <button
              className="results__secret-toggle"
              onClick={() => setShowPlayer1Secret(!showPlayer1Secret)}
              style={{ borderColor: player1.color }}
            >
              <span className="results__secret-label">
                Número secreto de {player1.name || "Jugador 1"}:
              </span>
              <span className="results__secret-value">
                {showPlayer1Secret ? player1.secretNumber : "••••"}
              </span>
            </button>
          </div>

          <div className="results__secret-item">
            <button
              className="results__secret-toggle"
              onClick={() => setShowPlayer2Secret(!showPlayer2Secret)}
              style={{ borderColor: player2.color }}
            >
              <span className="results__secret-label">
                Número secreto de {player2.name || "Jugador 2"}:
              </span>
              <span className="results__secret-value">
                {showPlayer2Secret ? player2.secretNumber : "••••"}
              </span>
            </button>
          </div>
        </div>

        <div className="results__tabs">
          <button
            className={`results__tab ${activeTab === 1 ? "results__tab--active" : ""}`}
            onClick={() => setActiveTab(1)}
            style={activeTab === 1 ? { borderBottomColor: player1.color } : {}}
          >
            Ver intentos de {player1.name || "Jugador 1"}
          </button>
          <button
            className={`results__tab ${activeTab === 2 ? "results__tab--active" : ""}`}
            onClick={() => setActiveTab(2)}
            style={activeTab === 2 ? { borderBottomColor: player2.color } : {}}
          >
            Ver intentos de {player2.name || "Jugador 2"}
          </button>
        </div>

        <div className="results__attempts">
          {activeAttempts.length === 0 ? (
            <p className="results__empty">Sin intentos registrados</p>
          ) : (
            <ul className="attempts__list">
              {activeAttempts.map((item) => (
                <li key={item.ts} className="attempts__item">
                  <div className="attempts__guess">{item.guess}</div>
                  <div className="attempts__result">
                    <span className="attempts__pill attempts__pill--bull">Toros: {item.bulls}</span>
                    <span className="attempts__pill attempts__pill--cow">Vacas: {item.cows}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="results__new-game"
          onClick={() => setShowNewGameModal(true)}
        >
          Nuevo Juego
        </button>
      </div>

      {showNewGameModal && (
        <SurrenderModal
          onConfirm={handleNewGame}
          onCancel={() => setShowNewGameModal(false)}
          title="¿Comenzar un nuevo juego?"
          message="Se perderán todos los datos del juego actual."
          confirmText="Nuevo Juego"
        />
      )}
    </>
  );
}
