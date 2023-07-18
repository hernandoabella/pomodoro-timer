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
  updateWorkTimer();
  updateBreakTimer();
  updateCycleCounter();
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

  if (breakMinutes === 0 && breakSeconds === 0) {
    return;
  }

  if (breakSeconds !== 0) {
    breakSeconds--;
  } else if (breakMinutes !== 0 && breakSeconds === 0) {
    breakSeconds = 59;
    breakMinutes--;
  }

  breakMinutesElement.innerText = padZero(breakMinutes);
  breakSecondsElement.innerText = padZero(breakSeconds);
}

function updateCycleCounter() {
  let workMinutes = parseInt(workMinutesElement.innerText);
  let workSeconds = parseInt(workSecondsElement.innerText);
  let breakMinutes = parseInt(breakMinutesElement.innerText);
  let breakSeconds = parseInt(breakSecondsElement.innerText);

  if (workMinutes === 0 && workSeconds === 0 && breakMinutes === 0 && breakSeconds === 0) {
    workMinutesElement.innerText = "25";
    workSecondsElement.innerText = "00";
    breakMinutesElement.innerText = "5";
    breakSecondsElement.innerText = "00";

    let cycleCount = parseInt(counterElement.innerText);
    counterElement.innerText = cycleCount + 1;
  }
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
  counterElement.innerText = "0";

  stopTimer();
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}
