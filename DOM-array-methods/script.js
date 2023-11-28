const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

const formatMoney = (number) => {
  return `$${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

// Double the money
const doubleMoney = () => {
  const doubledMoneyData = data.map((item) => ({
    ...item,
    money: item.money * 2,
  }));

  data = doubledMoneyData;
  updateDOM(doubledMoneyData);
};

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

const filterOnlyMillionaire = () => {
  const updatedData = data.filter((user) => user.money > 1000000);
  data = updatedData;

  updateDOM();
};

const calculateWealthSum = () => {
  const totalWealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3> Total Wealth: <strong>${formatMoney(
    totalWealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
};

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", filterOnlyMillionaire);
calculateWealthBtn.addEventListener("click", calculateWealthSum);
