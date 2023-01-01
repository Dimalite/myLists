const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const millisecondElement = document.querySelector(".millisecond");

const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const stopButton = document.querySelector(".stop");
const recordButton = document.querySelector(".record");
const resetButton = document.querySelector(".reset");

let setNumber = document.querySelector(".inputNum");

// listeners
startButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
});
pauseButton.addEventListener("click", () => {
  clearInterval(interval);
});
stopButton.addEventListener("click", () => {
  clearInterval(interval);
  clearFields();
});
recordButton.addEventListener("click", () => {
  // clearInterval(interval);
  const results = document.querySelector(".results");
  const block = document.createElement("div");
  block.innerText = `Result ${hour > 9 ? hour : "0" + hour}:${
    minute > 9 ? minute : "0" + minute
  }:${second > 9 ? second : "0" + second}:${
    millisecond > 9 ? millisecond : "0" + millisecond
  }`;
  block.style.color = "white";
  block.style.marginLeft = 20 + "px";
  results.append(block);
  clearFields();
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
});
resetButton.addEventListener("click", () => {
  clearInterval(interval);
  clearFields();
  const results = document.querySelector(".results");
  results.innerText = "";
});

// variables
let hour = 00,
  minute = 00,
  second = 00,
  millisecond = 00,
  interval;

function startTimer() {
  millisecond++;

  // milliseconds
  if (millisecond < 9) {
    millisecondElement.innerText = "0" + millisecond;
  }
  if (millisecond > 9) {
    millisecondElement.innerText = millisecond;
  }
  if (millisecond > 99) {
    second++;
    secondElement.innerText = "0" + second;
    millisecond = 0;
    millisecondElement.innerText = "0" + millisecond;
  }

  // seconds
  if (second < 9) secondElement.innerText = "0" + second;
  if (second > 9) secondElement.innerText = second;
  if (second > 59) {
    minute++;
    minuteElement.innerText = "0" + minute;
    second = 0;
    secondElement.innerText = "0" + second;
  }

  // minutes
  if (minute < 9) minuteElement.innerText = "0" + minute;
  if (minute > 9) minuteElement.innerText = minute;
  if (minute > 59) {
    hour++;
    hourElement.innerText = "0" + hour;
    minute = 0;
    minuteElement.innerText = "0" + minute;
  }
  // hours
  if (hour < 9) hourElement.innerText = "0" + hour;
}

function clearFields() {
  hour = 00;
  minute = 00;
  second = 00;
  millisecond = 00;
  hourElement.textContent = "00";
  minuteElement.textContent = "00";
  secondElement.textContent = "00";
  millisecondElement.textContent = "00";
}

