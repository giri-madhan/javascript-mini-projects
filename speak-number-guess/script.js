const msg = document.getElementById("msg");

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const randomNum = getRandomNumber();

console.log("Random Number: ", randomNum);

window.speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

let recognition = new window.speechRecognition();

// Add Transcript to DOM
const addTranscriptToDOM = (transcript) => {
  msg.innerHTML = `
  <div>You said: </div>
  <span class='box'>${transcript}</span>`;
};

// Check Transcript against number
const checkResults = (transcript) => {
  const number = +transcript;
  console.log({ number });
  // Check if valid number
  if (Number.isNaN(number)) {
    msg.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  // Check if in range
  if (number > 100 || number < 1) {
    msg.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  // Check number
  if (number === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the correct number! <br><br>
      It was ${number}!</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (number > randomNum) {
    msg.innerHTML += "<div> Go Lower </div>";
  } else {
    msg.innerHTML += "<div> Go Higher </div>";
  }
};

// Capture user speech
const onSpeak = (e) => {
  const transcript = e.results[0][0].transcript;
  console.log({ transcript });
  addTranscriptToDOM(transcript);
  checkResults(transcript);
};

// Start recognition and game
recognition.start();

// Result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
