/**
 * Reinicia el juego completo
 * @param {function} setGameStarted - Función para detener el juego
 * @param {function} setCurrentPlayer - Resetear al jugador 1
 * @param {function} setAttempts - Limpiar intentos
 * @param {function} setPlayer1 - Resetear jugador 1
 * @param {function} setPlayer2 - Resetear jugador 2
 * @param {object} COLOR_OPTIONS - Opciones de color por defecto
 * @param {function} setGameEnded - Resetear estado de finalización
 */
export function resetGame(setGameStarted, setCurrentPlayer, setAttempts, setPlayer1, setPlayer2, COLOR_OPTIONS, setGameEnded) {
  setGameStarted(false);
  setGameEnded(false);
  setCurrentPlayer(1);
  setAttempts({ 1: [], 2: [] });
  setPlayer1({
    name: "",
    secretNumber: "",
    color: COLOR_OPTIONS[0].value
  });
  setPlayer2({
    name: "",
    secretNumber: "",
    color: ""
  });
}
