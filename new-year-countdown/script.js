const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// Set bacoground year
year.innerText = currentYear + 1;

// Update Countdown time on UI
const updateCountDown = () => {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const secondsUntilNY = Math.floor(diff / 1000) % 60;
  const minutesUntilNY = Math.floor(diff / 1000 / 60) % 60;
  const hoursUntilNY = Math.floor(diff / 1000 / 60 / 60) % 24;
  const daysUntilNY = Math.floor(diff / 1000 / 60 / 60 / 24);

  // Update values on DOM
  days.innerHTML = daysUntilNY;
  hours.innerHTML = hoursUntilNY < 10 ? `0${hoursUntilNY}` : hoursUntilNY;
  minutes.innerHTML =
    minutesUntilNY < 10 ? `0${minutesUntilNY}` : minutesUntilNY;
  seconds.innerHTML =
    secondsUntilNY < 10 ? `0${secondsUntilNY}` : secondsUntilNY;
};

updateCountDown();

// runs every second
setInterval(() => {
  updateCountDown();
}, 1000);

// Show spinner before countdown

setTimeout(() => {
  // remove loader
  loading.remove();

  // show countdown
  countdown.style.display = "flex";
}, 1000);
