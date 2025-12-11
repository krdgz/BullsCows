
import { useState } from "react"
import Header from "./Components/Header"
import { COLOR_OPTIONS } from "./consts"
import FormAddPlayer from "./Components/FormAddPlayer"
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
    color: COLOR_OPTIONS[1].value
  })
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = player1, 2 = player2

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
        {!gameStarted ?
          <FormAddPlayer
            player = {currentStep ===1 ? player1:player2 }
            setPlayer = {currentStep ===1 ? setPlayer1: setPlayer2}
            setCurrentStep={setCurrentStep}
            setGameStarted={setGameStarted}
            currentStep = {currentStep}
          />
          : (
            <h1>Hello ping</h1>
          )}
      </main>

    </>
  )
}

export default App
