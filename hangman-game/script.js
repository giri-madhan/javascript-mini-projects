const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "elephant",
  "guitar",
  "mountain",
  "ocean",
  "computer",
  "butterfly",
  "courage",
  "umbrella",
  "treasure",
  "whisper",
  "jigsaw",
  "kangaroo",
  "piano",
  "fireworks",
  "laughter",
  "mystery",
  "zeppelin",
  "bubble",
  "carousel",
  "dolphin",
  "enchanted",
  "flamingo",
  "garden",
  "hurricane",
  "illusion",
  "jungle",
  "knight",
  "lighthouse",
  "mermaid",
  "nightingale",
  "octopus",
  "paradise",
  "quicksilver",
  "rainbow",
  "sapphire",
  "thunder",
  "unicorn",
  "volcano",
  "waterfall",
  "xylophone",
  "yesterday",
  "zephyr",
  "astronomy",
  "bazaar",
  "cascade",
  "dreamscape",
  "eclipse",
  "festival",
  "galaxy",
  "harmony",
  "infinity",
  "jubilee",
  "kaleidoscope",
  "lullaby",
  "moonlight",
  "nirvana",
  "opulence",
  "polaris",
  "quasar",
  "radiance",
  "serendipity",
  "tranquility",
  "utopia",
  "vivid",
  "wanderlust",
  "xanadu",
  "yearning",
  "zestful",
  "alchemy",
  "blissful",
  "cosmos",
  "dandelion",
  "ethereal",
  "fairyland",
  "gossamer",
  "halcyon",
  "incandescent",
  "jovial",
  "kismet",
  "luminous",
  "melancholy",
  "noble",
  "oasis",
  "panorama",
  "quaint",
  "resplendent",
  "serene",
  "talisman",
  "uplifting",
  "verdant",
  "whimsical",
  "xenial",
  "yonder",
  "zenith",
];


const correctletters = [];
const wrongLetters = [];

const getNewWord = () => words[Math.floor(Math.random() * words.length)];
let selectedWord = getNewWord();

const showPopup = (message) => {
  finalMessage.innerText = message;
  popup.style.display = "flex";
};

// Show hidden word
const displayWord = () => {
  wordEl.innerHTML = `
        ${selectedWord
          .split("")
          .map(
            (letter) => `
                <span class='letter'>${
                  correctletters.includes(letter) ? letter : ""
                }</span>
            `
          )
          .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  // Checking if won
  if (innerWord === selectedWord) {
    showPopup("Congratulations! You won! 🥳");
  }
};

displayWord();

// Update Wrong Letters
const updateWrongLettersEl = () => {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display Parts
  figureParts.forEach((part, index) => {
    const noOfErrors = wrongLetters.length;

    // Show number of parts based on number of errors
    if (index < noOfErrors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    showPopup("Unfortunately you lost. 😔");
  }
};

// Show notification
const showNotification = () => {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
};

// Keydown letter press
window.addEventListener("keydown", (e) => {
  const letter = e.key;

  if (letter >= "a" && letter <= "z") {
    if (selectedWord.includes(letter)) {
      if (!correctletters.includes(letter)) {
        correctletters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  // Empty arrays
  correctletters.splice(0);
  wrongLetters.splice(0);

  selectedWord = getNewWord();

  displayWord();
  console.log({ wrongLetters });

  updateWrongLettersEl();

  popup.style.display = "none";
});