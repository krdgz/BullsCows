
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
import { savePlayers, loadPlayers, saveGameState, loadGameState, getAttempts, saveSetupProgress, loadSetupProgress, loadTurnState } from "./utils/storage"
import { useEffect } from "react"


function App() {
  const [player1, setPlayer1] = useState({
    name: '',
    secretEnc: "",
    color: COLOR_OPTIONS[0].value
  })
  const [player2, setPlayer2] = useState({
    name: "",
    secretEnc: "",
    color: ""
  })
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1); // Turno actual
  const [attempts, setAttempts] = useState({ 1: [], 2: [] });
  const [winnerModal, setWinnerModal] = useState({ open: false, player: null });
  const [helpOpen, setHelpOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [setupProgress, setSetupProgress] = useState({ player1Done: false, player2Done: false });
  const [turnState, setTurnState] = useState(null);

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
      await saveSetupProgress(setupProgress.player1Done, setupProgress.player2Done);
      if (player1.secretEnc || player2.secretEnc) {
        await savePlayers({ ...player1, secretEnc: player1.secretEnc }, { ...player2, secretEnc: player2.secretEnc });
      }
    })();
  }, [hydrated, gameStarted, gameEnded, currentPlayer, player1, player2, setupProgress]);

  // Intento de carga al inicio (no bloqueante)
  useEffect(() => {
    (async () => {
      const state = await loadGameState();
      if (state) {
        setGameStarted(Boolean(state.gameStarted));
        setGameEnded(Boolean(state.gameEnded));
        setCurrentPlayer(state.currentPlayer || 1);
      }
      const progress = await loadSetupProgress();
      setSetupProgress(progress);
      
      const { p1, p2 } = await loadPlayers();
      if (p1) {
        setPlayer1({ name: p1.name || '', color: p1.color || COLOR_OPTIONS[0].value, secretEnc: p1.secretEnc || '' });
      }
      if (p2) {
        setPlayer2({ name: p2.name || '', color: p2.color || '', secretEnc: p2.secretEnc || '' });
      }
      const [a1, a2] = await Promise.all([getAttempts(1), getAttempts(2)]);
      setAttempts({ 1: a1 || [], 2: a2 || [] });
      const turnState = await loadTurnState();
      if (turnState) {
        setTurnState(turnState);
      }
      setHydrated(true);
    })();
  }, []);

  return (
    <>
      <main className="main">
        <Header />
        {!hydrated ? null : gameEnded ? (
          <GameResults
            player1={player1}
            player2={player2}
            attempts={attempts}
            onNewGame={async () => await resetGame(setGameStarted, setCurrentPlayer, setAttempts, setPlayer1, setPlayer2, COLOR_OPTIONS, setGameEnded, setSetupProgress, setTurnState)}
          />
        ) : !setupProgress.player1Done || !setupProgress.player2Done ? (
          <FormAddPlayer
            player={!setupProgress.player1Done ? player1 : player2}
            setPlayer={!setupProgress.player1Done ? setPlayer1 : setPlayer2}
            blockedColor={!setupProgress.player1Done ? player2.color : player1.color}
            setGameStarted={setGameStarted}
            currentStep={!setupProgress.player1Done ? 1 : 2}
            onStepComplete={(step) => {
              const updated = { ...setupProgress, [step === 1 ? 'player1Done' : 'player2Done']: true };
              setSetupProgress(updated);
              saveSetupProgress(updated.player1Done, updated.player2Done);
            }}
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
            turnState={turnState}
            setTurnState={setTurnState}
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
            setTurnState(null);
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
