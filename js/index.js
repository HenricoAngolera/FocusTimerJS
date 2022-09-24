// EcmaScript - 2015 ES6 Modules
/* // default import
import resetControls from "./controls.js"
// named import
import { Timer } from "./timer.js" */
import Controls from "./controls.js"
import Timer from "./timer.js"
import Sound from "./sounds.js"
import Events from "./events.js"
// importar direto
import { 
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet,
  minutesDisplay,
  secondsDisplay
 } from './elements.js'


/* // desestruturação
const {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet,
  buttonSoundOn,
  buttonSoundOff,
  minutesDisplay,
  secondsDisplay
} = elements */

// injeção de dependências para o controls.js
const controls = Controls({
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonStop
})

// injeção de dependências para o timer.js
const timer = Timer({
  minutesDisplay,
  secondsDisplay, 
  resetControls: controls.reset
  
})

const sound = Sound()

Events({controls, timer, sound})