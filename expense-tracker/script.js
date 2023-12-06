const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorageTransactions !== null ? localStorageTransactions : [];

// init app
const init = () => {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);

  updateValues();
};

// Adds a new transaction
const addTransaction = (e) => {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Enter a ");
    return;
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);

  updateValues();

  updateLocalStorage();

  text.value = "";
  amount.value = "";
};

// Generate ID
const generateID = () => {
  return Math.floor(Math.random() * 1000000000);
};

// Remove Transaction by ID
const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
};

// Add Transanctions
const addTransactionDOM = (transaction) => {
  const isNegativeAmount = transaction.amount < 0;

  // Get Sign
  const Sign = isNegativeAmount ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(isNegativeAmount ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${Sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onClick="removeTransaction(${
      transaction.id
    })">x</button>
  `;

  list.appendChild(item);
};

// Update the balance, income and expense
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, amount) => (acc += amount), 0).toFixed(2);

  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, income) => (acc += income), 0)
    .toFixed(2);

  const expense = (
    amounts
      .filter((amount) => amount <= 0)
      .reduce((acc, expense) => (acc += expense), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;

  console.log({ total, income, expense });
};

// Update Local storage Transactions
const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

init();

// Event Listeners
form.addEventListener("submit", addTransaction);
