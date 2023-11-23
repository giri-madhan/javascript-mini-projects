const container = document.querySelector("#container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

// Local storage keys
const selectedMovieIndexLSKey = "selectedMovieIndex";
const selectedMoviePriceLSKey = "selectedMoviePrice";
const selectedSeatsLSKey = "selectedSeats";

// update total seats count
const updatedSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem(selectedSeatsLSKey, JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Getting data from local storage on initial load
const populateUI = (() => {
  const selectedSeatsLS = JSON.parse(localStorage.getItem(selectedSeatsLSKey));
  const movieIndexLS = JSON.parse(
    localStorage.getItem(selectedMovieIndexLSKey)
  );
  const moviePriceLS = JSON.parse(
    localStorage.getItem(selectedMoviePriceLSKey)
  );

  if (selectedSeatsLS && selectedSeatsLS.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatsLS.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  if (movieIndexLS) {
    movieSelect.selectedIndex = movieIndexLS;
  }

  updatedSelectedCount();
})();

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem(selectedMovieIndexLSKey, movieIndex);
  localStorage.setItem(selectedMoviePriceLSKey, moviePrice);
};

// Movie select event
movieSelect.addEventListener("change", (event) => {
  ticketPrice = +event.target.value;

  setMovieData(event.target.selectedIndex, event.target.value);

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
