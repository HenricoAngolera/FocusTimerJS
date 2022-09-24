import Sound from "./sounds.js"

// Estrutura de uma Factory (padrão de projeto)
// O default permite que envie a função sem necessariamente usar o nome dela para importar
export default function Timer({
  // destricturing, desestruturando as dependências em objeto direto nos parâmetros
  minutesDisplay,
  secondsDisplay, 
  resetControls
}) {

  let timerTimeOut
  let minutes = Number(minutesDisplay.textContent)

  function updateDisplay(newMinutes, seconds) {
    newMinutes = newMinutes === undefined ? minutes : newMinutes
    seconds = seconds === undefined ? 0 : seconds
    /* esse minutes não tem nada a ver com o minutes global, são escopos diferentes */
    // .textContent = mudar o conteúdo do span
    minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
    // .padStart = função que preenche uma string. O primeiro parâmetro, é o número de caracteres que ele vai preencher, o segundo parâmetro, é a string que vai preencher, e como é padStart, vai preencher no início.
    secondsDisplay.textContent = String(seconds).padStart(2, '0')
  }

  function reset() {
    // minutes de escopo global
    updateDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
    // parar o timer no momento do timerTimeOut
  }

  // Event-driven - dirigido a eventos
  // programação imperativa
  // callback
  /* refatoração 
  mudar o código para deixá-lo mais entendivel, mais performático, SEM ALTERAR suas funcionalidades
*/
  function countDown() {
    // guardar o number que o setTimeOut retorna
    timerTimeOut = setTimeout(
      /* executa uma função depois de um tempo determinado abaixo */ function () {
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)
        let isFinished = minutes <= 0 && seconds <= 0

        updateDisplay(minutes, 0)

        if (isFinished) {
          resetControls()
          updateDisplay()
          Sound().timeEnd()
          return
          // parar a execução da função, sempre que a função encontra um return, para a execução
        }

        if (seconds <= 0) {
          seconds = 60
          --minutes
        }

        updateDisplay(minutes, String(seconds - 1))
        countDown()
        // chamando a função dentro da própria função, uma recursão
      },
      1000 /* tempo para executar a função de novo: 1 segundo */
    )
  }

  function updateMinutes (newMinutes) {
    minutes = newMinutes
  }

  function hold () {
    clearTimeout(timerTimeOut)
  }

  return /* shorthand property: retornar um objeto sem indicar necessáriamente propriedade e valor*/{
    updateDisplay,
    reset,
    countDown,
    updateMinutes,
    hold
  }

}


  // named export
  // export { countDown, resetTimer }
  // também é named export direto na função: export function countDown() {}