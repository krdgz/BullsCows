/**
 * Calcula los toros y vacas entre dos números de 4 dígitos
 * @param {string} secretNumber - Número secreto del oponente
 * @param {string} guessNumber - Número adivinado
 * @returns {object} { bulls, cows }
 */
export function calculateResult(secretNumber, guessNumber) {
  let bulls = 0;
  let cows = 0;

  const secretDigits = secretNumber.split("");
  const guessDigits = guessNumber.split("");

  // Contar toros (cifra correcta en posición correcta)
  for (let i = 0; i < 4; i++) {
    if (secretDigits[i] === guessDigits[i]) {
      bulls++;
    }
  }

  // Contar vacas (cifra correcta en posición incorrecta)
  const secretCopy = [...secretDigits];

  for (let i = 0; i < 4; i++) {
    if (secretDigits[i] !== guessDigits[i]) {
      const guessIndex = secretCopy.indexOf(guessDigits[i]);
      if (guessIndex !== -1) {
        cows++;
        secretCopy[guessIndex] = null; // Marca como usado
      }
    }
  }

  return { bulls, cows };
}
