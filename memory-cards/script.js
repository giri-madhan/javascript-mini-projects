const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Cards from local storage
const getCardsData = () => {
  let cards = JSON.parse(localStorage.getItem("cards"));

  return cards === null ? [] : cards;
};

const setCardsData = (cards) => {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
};

// list card data
const cardsData = getCardsData();

// Create all cards
const createCards = () => {
  cardsData.forEach((data, index) => createCard(data, index));
};

// Show number of cards
const updateCurrentText = () => {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
};

// Create a single card in DOM
const createCard = (data, index) => {
  const card = document.createElement("div");

  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
        <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
    </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
};

createCards();

const clearCards = () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
};

// Event listeners
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Shwo add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value.trim();
  const answer = answerEl.value.trim();

  if (question.length && answer.length) {
    const newCard = { question, answer };

    createCard(newCard);

    // clear inputs
    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards button
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("cards");
  cardsContainer.innerHTML = "";
  window.location.reload();
});
