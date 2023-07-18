const start = document.getElementById("start");
const reset = document.getElementById("reset");
const stop = document.getElementById("stop");

const wm = document.getElementById("workMinutes");
const ws = document.getElementById("workSeconds");

const bm = document.getElementById("breakMinutes");
const bs = document.getElementById("breakSeconds");

// Variable reference for start time
let startTimer;
let timeRunning = false;

// Start timer
start.addEventListener("click", function () {
	if (startTimer === undefined) {
		startTimer = setInterval(time, 1000);
		timeRunning = false;
	}
});

// Stop timer
stop.addEventListener("click", function () {
	stopInterval();
	startTimer = undefined;
});

// Reset timer
reset.addEventListener("click", function () {
	wm.innerText = 25;
	ws.innerText = "00";

	bm.innerText = 5;
	bs.innerText = "00";

	document.getElementById("counter").innerText = 0;
	stopInterval();
	startTimer = undefined;
});

function time() {
	// Work timer
	if (ws.innerText != 0) {
		ws.innerText--;
	} else if (wm.innerText != 0 && ws.innerText == 0) {
		ws.innerText = 59;
		wm.innerText--;
	}

	// Break timer
	if (wm.innerText == 0 && ws.innerText == 0) {
		if (bs.innerText != 0) {
			bs.innerText--;
		} else if (bm.innerText != 0 && bs.innerText == 0) {
			bs.innerText = 59;
			bm.innerText--;
		}
	}

	// Increment cycle count by one when work and break timers are zero
	if (wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0) {
		wm.innerText = 25;
		ws.innerText = "00";

		bm.innerText = 5;
		bs.innerText = "00";

		document.getElementById("counter").innerText++;
	}
}

// Stop interval function
function stopInterval() {
	clearInterval(startTimer);
}