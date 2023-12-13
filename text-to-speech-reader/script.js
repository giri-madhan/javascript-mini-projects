const main = document.getElementById("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeTextBoxBtn = document.getElementById("close");
const textBox = document.getElementById("text-box");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

// Create speech boxes
const createBox = (item) => {
  const { image, text } = item;

  const box = document.createElement("div");
  box.classList.add("box");
  box.innerHTML = `
    <img src=${image} alt="${text}" />
    <p class="info">${text}</p>
  `;

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Active effect on UI
    box.classList.add("active");
    // Removing effect after few seconds
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
};

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Set text on box
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

data.forEach(createBox);

// Voices
let voices = [];

const getVoices = () => {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
};

const setVoice = (e) => {
  message.voice = voices.find((voice) => voice.name === e.target.value);
};

const readCustomText = () => {
  setTextMessage(textArea.value);
  speakText();
};

// Event listeners
// Toggle text box
toggleBtn.addEventListener("click", () => textBox.classList.toggle("show"));
closeTextBoxBtn.addEventListener("click", () =>
  textBox.classList.remove("show")
);

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Read text button
readBtn.addEventListener("click", readCustomText);

// init
getVoices();

