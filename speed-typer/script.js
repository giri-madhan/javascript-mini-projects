const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game");
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

// Update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

// Event listeners
text.addEventListener("input", (e) => {
  const insertedtext = e.target.value;

  if (insertedtext === randomWord) {
    addWordToDOM();

    updateScore();

    e.target.value = "";
  }
});
