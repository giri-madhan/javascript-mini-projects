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

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctletters = [];
const wrongLetters = [];

// Show hidden word
const displayWord = (() => {
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
    finalMessage.innerText = "Congratulations! You won! 🥳";
    popup.style.display = "flex";
  }
})();
