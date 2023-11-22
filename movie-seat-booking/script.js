const container = document.querySelector("#container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// update total seats count
const updatedSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Movie select event
movieSelect.addEventListener("change", (event) => {
  ticketPrice = +event.target.value;

  updatedSelectedCount();
});

// Seat click event
container.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (
    clickedElement.classList.contains("seat") &&
    !clickedElement.classList.contains("occupied")
  ) {
    clickedElement.classList.toggle("selected");

    updatedSelectedCount();
  }
});
