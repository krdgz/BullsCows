
import { useState } from "react"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { COLOR_OPTIONS } from "./consts"
import FormAddPlayer from "./Components/FormAddPlayer"
import GamePlay from "./Components/GamePlay"
import GameResults from "./Components/GameResults"
import WinnerModal from "./Components/WinnerModal"
import Help from "./Components/Help"
import { resetGame } from "./utils/resetGame"
import { savePlayers, loadPlayers, saveGameState, loadGameState, getAttempts } from "./utils/storage"
import { encryptSecret, decryptSecret } from "./utils/crypto"
import { useEffect } from "react"


function App() {
  const [player1, setPlayer1] = useState({
    name: '',
    secretNumber: "",
    color: COLOR_OPTIONS[0].value
  })
  const [player2, setPlayer2] = useState({
    name: "",
    secretNumber: "",
    color: ""
  })
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1); // Turno actual
  const [attempts, setAttempts] = useState({ 1: [], 2: [] });
  const [winnerModal, setWinnerModal] = useState({ open: false, player: null });
  const [helpOpen, setHelpOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const handleHash = () => setHelpOpen(window.location.hash === "#help");
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(()=>{
    if(gameStarted){
      console.log("Player 1:", player1);
    console.log("Player 2:", player2);
    }
  },[gameStarted])

  // Persistencia básica: guardar estado de juego y jugadores (con secreto cifrado)
  useEffect(() => {
    if (!hydrated) return; // evitar escribir antes de cargar desde DB
    (async () => {
      await saveGameState({ gameStarted, gameEnded, currentPlayer });
      if (player1.secretNumber || player2.secretNumber) {
        const p1Enc = player1.secretNumber ? await encryptSecret(player1.secretNumber, 'session-pass') : '';
        const p2Enc = player2.secretNumber ? await encryptSecret(player2.secretNumber, 'session-pass') : '';
        await savePlayers({ ...player1, secretEnc: p1Enc }, { ...player2, secretEnc: p2Enc });
      }
    })();
  }, [hydrated, gameStarted, gameEnded, currentPlayer, player1, player2]);

  // Intento de carga al inicio (no bloqueante)
  useEffect(() => {
    (async () => {
      const state = await loadGameState();
      if (state) {
        setGameStarted(Boolean(state.gameStarted));
        setGameEnded(Boolean(state.gameEnded));
        setCurrentPlayer(state.currentPlayer || 1);
      }
      const { p1, p2 } = await loadPlayers();
      if (p1) {
        const secretNumber = p1.secretEnc ? await decryptSecret(p1.secretEnc, 'session-pass') : '';
        setPlayer1({ name: p1.name || '', color: p1.color || COLOR_OPTIONS[0].value, secretNumber });
      }
      if (p2) {
        const secretNumber = p2.secretEnc ? await decryptSecret(p2.secretEnc, 'session-pass') : '';
        setPlayer2({ name: p2.name || '', color: p2.color || '', secretNumber });
      }
      const [a1, a2] = await Promise.all([getAttempts(1), getAttempts(2)]);
      setAttempts({ 1: a1 || [], 2: a2 || [] });
      setHydrated(true);
    })();
  }, []);

  return (
    <>
      <main className="main">
        <Header />
        {!hydrated ? null : !gameStarted ? (
          <FormAddPlayer
            player = {currentPlayer ===1 ? player1:player2 }
            setPlayer = {currentPlayer ===1 ? setPlayer1: setPlayer2}
            blockedColor={currentPlayer === 1 ? player2.color : player1.color}
            setCurrentStep={setCurrentPlayer}
            setGameStarted={setGameStarted}
            currentStep = {currentPlayer}
          />
        ) : gameEnded ? (
          <GameResults
            player1={player1}
            player2={player2}
            attempts={attempts}
            onNewGame={async () => await resetGame(setGameStarted, setCurrentPlayer, setAttempts, setPlayer1, setPlayer2, COLOR_OPTIONS, setGameEnded)}
          />
        ) : (
          <GamePlay 
            player1={player1}
            player2={player2}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            attempts={attempts}
            setAttempts={setAttempts}
            onWin={(player) => setWinnerModal({ open: true, player })}
          />
        )}
        <Footer />
      </main>
      {winnerModal.open && (
        <WinnerModal
          player={winnerModal.player}
          onClose={() => {
            setWinnerModal({ open: false, player: null });
            setGameEnded(true);
          }}
        />
      )}
      {helpOpen && (
        <Help
          onClose={() => {
            setHelpOpen(false);
            if (window.location.hash === "#help") {
              history.replaceState(null, "", window.location.pathname);
            }
          }}
          githubUrl={"https://github.com/krdgz/BullsCows"}
        />
      )}
      
    </>
  )
}

export default App
