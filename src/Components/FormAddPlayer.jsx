import { useState } from "react";
import { COLOR_OPTIONS } from "../consts";
import { useEffect } from "react";


export default function FormAddPlayer({
    player,
    setPlayer,
    blockedColor,
    currentStep,
    setCurrentStep,
    setGameStarted

}) {
    const getAvailableOptions = () => COLOR_OPTIONS.filter((option) => option.value !== blockedColor);

    const [name, setName] = useState(player.name || "");
    const [secretNumber, setSecretNumber] = useState(player.secretNumber || "");
    const [color, setColor] = useState(() => {
        const available = getAvailableOptions();
        if (player.color && player.color !== blockedColor) return player.color;
        return available[0]?.value || "";
    });
    const [error, setError] = useState("");
    const title = currentStep === 1 ? "Jugador 1" : "Jugador 2";

    useEffect(() => {
        const available = getAvailableOptions();
        setName(player.name || "");
        setSecretNumber(player.secretNumber || "");
        if (player.color && player.color !== blockedColor) {
            setColor(player.color);
        } else {
            setColor(available[0]?.value || "");
        }
    }, [currentStep, blockedColor]);

    // Guardar automáticamente los cambios en el estado padre
    useEffect(() => {
        setPlayer({
            name,
            secretNumber,
            color
        });
    }, [name, secretNumber, color]);

    function validateAndNavigate() {
        const digitsOnly = /^[0-9]{4}$/;
        if(secretNumber[0] === "0"){  
            setError("El número secreto no puede comenzar con 0.")
            return false
        }

        if (!digitsOnly.test(secretNumber)) {
            setError("Ingresa un número de 4 cifras (solo dígitos).");
            return false;
        }
        if (new Set(secretNumber).size !== 4) {
            setError("El número secreto no debe tener cifras repetidas.");
            return false;
        }
        setError("");
        return true;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!validateAndNavigate()) return;

        if (currentStep === 1) {
            setCurrentStep(2);
        } else {
            setGameStarted(true);
        }
    }

    function handleBack() {
        if (!validateAndNavigate()) return;
        setCurrentStep(1);
    }
    

    return (
        <form onSubmit={handleSubmit} className="player-form">
            <header className="player-form__header">
                <h2 className="player-form__title">{title}</h2>
                <span
                    aria-hidden
                    className="player-form__color-indicator"
                    style={{ background: color }}
                />
            </header>

            <label className="player-form__label">
                <span className="player-form__label-text">Nombre</span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value.trim())}
                    placeholder="Tu nombre (opcional)"
                    autoComplete="off"
                    className="player-form__input"
                />
            </label>

            <label className="player-form__label">
                <span className="player-form__label-text">Número secreto (4 cifras)</span>
                <input
                    type="password"
                    value={secretNumber}
                    onChange={(e) => setSecretNumber(e.target.value.replace(/\D+/g, "").slice(0, 4))}
                    placeholder="0000"
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    className="player-form__input"
                    autoComplete="off"
                />
            </label>

            <label className="player-form__label">
                <span className="player-form__label-text">Color</span>
                <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="player-form__select"
                >
                    {getAvailableOptions().map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>

            {error && (
                <div role="alert" className="player-form__error">
                    {error}
                </div>
            )}
            <div className="player-form__button-container">
                {currentStep === 2 && (
                    <button
                        type="button"
                        onClick={handleBack}
                        className="player-form__submit"
                    >
                        Jugador 1
                    </button>
                )}
                <button type="submit" style={{background: color}} className="player-form__submit">
                    {currentStep === 1 ? "Siguiente" : "Iniciar juego"}
                </button>
            </div>

        </form>
    );
}
