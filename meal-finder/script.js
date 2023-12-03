const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// Search meal and fetch from API
const searchMeal = (e) => {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = "";

  // Get the search term
  const searchTerm = search.value;

  // Check for empty
  if (searchTerm.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for "${searchTerm}":</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML =
            "<p>There are no search results. Try again </p>";
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
      });
    // Clear search text
    search.value = "";
  } else {
    alert("Please enter a meal or keyword to search");
  }
};

// Event listeners
submit.addEventListener("submit", searchMeal);
