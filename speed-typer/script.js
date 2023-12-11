const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");
const loader = document.querySelector(".loader");

// List of words for games
// https://random-word-api.herokuapp.com/word

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Difficulty setting
const difficultyLS = localStorage.getItem("difficulty");
// set difficulty setting on load
let difficulty = difficultyLS !== null ? difficultyLS : "medium";
difficultySelect.value = difficulty;

// Autofocus to text input on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Get random word from fake rest API
const getRandomWord = async () => {
  const res = await fetch("https://random-word-api.herokuapp.com/word");
  const word = await res.json();

  return word[0];
};

// Show or Hide loaders
const showLoader = () => {
  loader.style.display = "flex";
  loader.classList.add("loading");
};
const hideLoader = () => {
  loader.style.display = "none";
  loader.classList.remove("loading");
};

// Add random word to DOM
const addWordToDOM = async () => {
  word.innerText = "";
  showLoader();
  randomWord = await getRandomWord();
  hideLoader();

  word.innerText = randomWord;
};

addWordToDOM();

// Game over. Show end screen
const gameOver = () => {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Play again</button>
  `;

  endgameEl.style.display = "flex";
};

// Update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    // Game over
    clearInterval(timeInterval);

    gameOver();
  }
}

// Event listeners
// Typing word
text.addEventListener("input", (e) => {
  const insertedtext = e.target.value;

  if (insertedtext === randomWord) {
    addWordToDOM();

    updateScore();

    e.target.value = "";

    switch (difficulty) {
      case "easy":
        time += 5;
        return;
      case "medium":
        time += 3;
        return;
      case "hard":
        time += 2;
        return;
      default:
        time += 5;
    }

    updateTime();
  }
});

// Settings button click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});