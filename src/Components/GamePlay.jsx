import { useState } from "react";
import { calculateResult } from "../utils/gameLogic";
import AttemptsList from "./AttemptsList";
import SurrenderModal from "./SurrenderModal";
import confetti from "canvas-confetti";

export default function GamePlay({ player1, player2, currentPlayer, setCurrentPlayer, attempts, setAttempts, onWin, onSurrender }) {
    const isPlayer1 = currentPlayer === 1;
    const activePlayer = isPlayer1 ? player1 : player2;
    const opponentPlayer = isPlayer1 ? player2 : player1;

    const [guess, setGuess] = useState("");
    const [result, setResult] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSurrenderModal, setShowSurrenderModal] = useState(false);

    const handleGuess = (e) => {
        e.preventDefault();
        if (guess.length !== 4) return;

        const { bulls, cows } = calculateResult(opponentPlayer.secretNumber, guess);
        setResult({ bulls, cows });
        setIsSubmitted(true);
        if (bulls === 4) {
            confetti()
            onWin?.(activePlayer);
        }
        setAttempts((prev) => {
            const updated = { ...prev };
            const newEntry = { guess, bulls, cows, ts: Date.now() };
            updated[currentPlayer] = [newEntry, ...(prev[currentPlayer] || [])];
            return updated;
        });
    };

    const handleNext = () => {
        setGuess("");
        setResult(null);
        setIsSubmitted(false);
        setCurrentPlayer(isPlayer1 ? 2 : 1);
    };

    const handleSurrender = () => {
        setShowSurrenderModal(false);
        onWin?.(opponentPlayer);
    };

    return (
        <>
            <div className="gameplay">
                <div className="gameplay__header" style={{ background: activePlayer.color }}>
                    <h2 className="gameplay__title">
                        Jugador {currentPlayer}: {activePlayer.name}
                    </h2>
                    <button
                        type="button"
                        className="gameplay__surrender"
                        onClick={() => setShowSurrenderModal(true)}
                    >
                        Rendirse
                    </button>
                </div>

                <div className="gameplay__container">
                    <form onSubmit={handleGuess} className="gameplay__form">
                        <label className="gameplay__label">
                            <span className="gameplay__label-text">Adivina el número (4 cifras)</span>
                            <input
                                type="text"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value.replace(/\D+/g, "").slice(0, 4))}
                                placeholder="0000"
                                inputMode="numeric"
                                disabled={isSubmitted}
                                className="gameplay__input"
                                autoFocus
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={guess.length !== 4 || isSubmitted}
                            style={{
                                background: isSubmitted ? `${activePlayer.color}4D` : activePlayer.color,
                                color: "#fff"
                            }}
                            className="gameplay__submit"
                        >
                            Adivinar
                        </button>
                    </form>

                    {result && (
                        <div className="gameplay__result">
                            <p className="gameplay__result-item">
                                <span className="gameplay__result-label">Toros:</span>
                                <span className="gameplay__result-value">{result.bulls}</span>
                            </p>
                            <p className="gameplay__result-item">
                                <span className="gameplay__result-label">Vacas:</span>
                                <span className="gameplay__result-value">{result.cows}</span>
                            </p>
                        </div>
                    )}

                    {isSubmitted && result?.bulls !== 4 && (
                        <button
                            type="button"
                            onClick={handleNext}
                            style={{ background: activePlayer.color }}
                            className="gameplay__next"
                        >
                            Siguiente Turno
                        </button>
                    )}

                    <AttemptsList attempts={attempts[currentPlayer] || []} color={activePlayer.color} />
                </div>
            </div>

            {showSurrenderModal && (
                <SurrenderModal
                    onConfirm={handleSurrender}
                    onCancel={() => setShowSurrenderModal(false)}
                />
            )}
        </>
    );
}
