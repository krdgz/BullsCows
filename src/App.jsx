
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

  return (
    <>
      <main className="main">
        <Header />
        {!gameStarted ? (
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
            onNewGame={() => resetGame(setGameStarted, setCurrentPlayer, setAttempts, setPlayer1, setPlayer2, COLOR_OPTIONS, setGameEnded)}
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
          githubUrl={"https://github.com/keni/BullsCows"}
        />
      )}
      
    </>
  )
}

export default App
