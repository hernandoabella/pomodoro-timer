// JavaScript
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const stopButton = document.getElementById("stop");

const workMinutesElement = document.getElementById("workMinutes");
const workSecondsElement = document.getElementById("workSeconds");

const breakMinutesElement = document.getElementById("breakMinutes");
const breakSecondsElement = document.getElementById("breakSeconds");

const counterElement = document.getElementById("counter");

let startTimer;
let timeRunning = false;
let cycleCount = 0;

startButton.addEventListener("click", function () {
  if (!timeRunning) {
    startTimer = setInterval(updateTimer, 1000);
    timeRunning = true;
  }
});

stopButton.addEventListener("click", function () {
  stopTimer();
});

resetButton.addEventListener("click", function () {
  resetTimer();
});

function updateTimer() {
  if (timeRunning) {
    if (workMinutesElement.innerText === "00" && workSecondsElement.innerText === "00") {
      if (breakMinutesElement.innerText === "00" && breakSecondsElement.innerText === "00") {
        // Reset work timer and start break timer after work is done
        workMinutesElement.innerText = "25";
        workSecondsElement.innerText = "00";

        breakMinutesElement.innerText = "5";
        breakSecondsElement.innerText = "00";

        cycleCount++;
        updateCycleCounter();

        playAudio(); // You can add a sound to notify the end of work time
      }
      updateBreakTimer();
    } else {
      updateWorkTimer();
    }
  }
}

function updateWorkTimer() {
  let workMinutes = parseInt(workMinutesElement.innerText);
  let workSeconds = parseInt(workSecondsElement.innerText);

  if (workSeconds !== 0) {
    workSeconds--;
  } else if (workMinutes !== 0 && workSeconds === 0) {
    workSeconds = 59;
    workMinutes--;
  }

  workMinutesElement.innerText = padZero(workMinutes);
  workSecondsElement.innerText = padZero(workSeconds);
}

function updateBreakTimer() {
  let breakMinutes = parseInt(breakMinutesElement.innerText);
  let breakSeconds = parseInt(breakSecondsElement.innerText);

  if (breakSeconds !== 0) {
    breakSeconds--;
  } else if (breakMinutes !== 0 && breakSeconds === 0) {
    breakMinutes--; // Reducir el contador de minutos primero
    breakSeconds = 59; // Luego ajustar el contador de segundos a 59
  }

  breakMinutesElement.innerText = padZero(breakMinutes);
  breakSecondsElement.innerText = padZero(breakSeconds);
}

function updateCycleCounter() {
  counterElement.innerText = cycleCount;
}

function stopTimer() {
  clearInterval(startTimer);
  timeRunning = false;
}

function resetTimer() {
  workMinutesElement.innerText = "25";
  workSecondsElement.innerText = "00";
  breakMinutesElement.innerText = "5";
  breakSecondsElement.innerText = "00";
  cycleCount = 0;
  updateCycleCounter();

  stopTimer();
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}

function playAudio() {
  // You can implement audio notification here, e.g., using the HTML5 audio element.
  // For simplicity, I'm leaving this function empty.
}